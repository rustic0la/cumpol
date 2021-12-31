import { ForbiddenError } from 'apollo-server-express';

import {
  Space,
  MutationAddSpaceArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addSpace: ResolverFn<
  ResolverTypeWrapper<Space>,
  {},
  Context,
  RequireFields<MutationAddSpaceArgs, 'title'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const user = await context.prisma.user.findUnique({
    where: { id: context.userId },
  });

  const space = await context.prisma.space.create({
    data: { title: args.title, user: { connect: { username: user?.username } } },
    include: {
      topics: true,
    },
  });

  const spaceAdded: Space = { ...space, topics: [] };
  context.pubsub.publish('spaceAdded', { spaceAdded });

  return spaceAdded;
};

export default addSpace;
