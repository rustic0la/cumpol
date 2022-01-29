import { ForbiddenError } from 'apollo-server-express';

import {
  MutationUpdateTopicArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateTopic: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationUpdateTopicArgs, 'title' | 'topicId'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedTopics = await prisma.space
    .update({
      where: { id: args.spaceId },
      data: {
        topics: {
          update: {
            where: { id: args.topicId },
            data: { title: args.title },
          },
        },
      },
    })
    .topics({ select: { id: true }, orderBy: { createdAt: 'asc' } });
  pubsub.publish('topicsIdsUpdated', {
    topicsIds: updatedTopics.map(({ id }) => id),
    spaceId: args.spaceId,
  });

  return { success: !!updatedTopics, error: null };
};

export default updateTopic;
