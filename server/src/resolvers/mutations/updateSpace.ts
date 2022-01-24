import { ForbiddenError } from 'apollo-server-express';

import {
  MutationUpdateSpaceArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateSpace: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationUpdateSpaceArgs, 'spaceId' | 'title'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedSpace = await context.prisma.space.update({
    where: { id: args.spaceId },
    data: { title: args.title },
  });

  const updatedSpaces = await context.prisma.user
    .findUnique({
      where: { id: context.userId },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('spacesUpdated', updatedSpaces);

  return { success: !!updatedSpace, error: null };
};

export default updateSpace;
