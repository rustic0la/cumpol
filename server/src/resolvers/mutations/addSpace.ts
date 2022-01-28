import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddSpaceArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addSpace: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationAddSpaceArgs, 'title'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedSpaces = await prisma.user
    .update({
      where: { id: userId },
      data: {
        spaces: {
          create: {
            title: args.title,
          },
        },
      },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });

  pubsub.publish('spacesUpdated', updatedSpaces);

  return { success: !!updatedSpaces, error: null };
};

export default addSpace;
