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
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedTopic = await context.prisma.topic.delete({
    where: { id: args.topicId },
  });

  const updatedTopics = await context.prisma.space
    .findUnique({
      where: { id: args.spaceId },
    })
    .topics({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('topicsUpdated', updatedTopics);

  return { success: !!deletedTopic, error: null };
};

export default deleteTopic;
