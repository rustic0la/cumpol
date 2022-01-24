import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddSpaceArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Space,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addSpace: ResolverFn<
  ResolverTypeWrapper<Space>,
  {},
  Context,
  RequireFields<MutationAddSpaceArgs, 'title'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const addedSpace = await context.prisma.space.create({
    data: { title: args.title, user: { connect: { id: context.userId } } },
  });

  const updatedSpaces = await context.prisma.user
    .findUnique({
      where: { id: context.userId },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('spacesUpdated', updatedSpaces);

  return addedSpace;
};

export default addSpace;
