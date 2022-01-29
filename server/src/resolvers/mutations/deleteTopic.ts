import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteTopicArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteTopic: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationDeleteTopicArgs, 'topicId' | 'spaceId'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedTopics = await prisma.space
    .update({
      where: { id: args.spaceId },
      data: {
        topics: {
          delete: {
            id: args.topicId,
          },
        },
      },
    })
    .topics({ select: { id: true }, orderBy: { createdAt: 'asc' } });
  pubsub.publish(
    'topicsIdsUpdated',
    updatedTopics.map(({ id }) => id),
  );

  return { success: !!updatedTopics, error: null };
};

export default deleteTopic;
