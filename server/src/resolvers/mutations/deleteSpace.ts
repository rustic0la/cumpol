import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteSpaceArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteSpace: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationDeleteSpaceArgs, 'spaceId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedSpaces = await context.prisma.user
    .update({
      where: { id: context.userId },
      data: {
        spaces: {
          delete: {
            id: args.spaceId,
          },
        },
      },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('spacesUpdated', updatedSpaces);

  return { success: !!updatedSpaces, error: null };
};

export default deleteSpace;
