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

  const addedSpace = await context.prisma.space.create({
    data: { title: args.title, user: { connect: { id: context.userId } } },
  });

  const updatedSpaces = await context.prisma.space.findMany({
    where: { userId: context.userId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('spacesUpdated', updatedSpaces);

  return addedSpace;
};

export default addSpace;
