import { ForbiddenError } from 'apollo-server-express';

import {
  MutationUpdateSpaceArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Space,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateSpace: ResolverFn<
  ResolverTypeWrapper<Space>,
  {},
  Context,
  RequireFields<MutationUpdateSpaceArgs, 'spaceId' | 'title'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedSpace = await context.prisma.space.update({
    where: { id: args.spaceId },
    data: { title: args.title },
  });

  const updatedSpaces = await context.prisma.space.findMany({
    where: { userId: context.userId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('spacesUpdated', updatedSpaces);

  return updatedSpace;
};

export default updateSpace;
