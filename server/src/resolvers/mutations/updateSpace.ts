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
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedSpaces = await prisma.user
    .update({
      where: { id: userId },
      data: {
        spaces: {
          update: {
            where: { id: args.spaceId },
            data: { title: args.title },
          },
        },
      },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
  pubsub.publish('spacesUpdated', updatedSpaces);

  return { success: !!updatedSpaces, error: null };
};

export default updateSpace;
