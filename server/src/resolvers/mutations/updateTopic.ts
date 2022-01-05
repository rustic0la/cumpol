import { ForbiddenError } from 'apollo-server-express';

import {
  Topic,
  MutationUpdateTopicArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateTopic: ResolverFn<
  ResolverTypeWrapper<Topic>,
  {},
  Context,
  RequireFields<MutationUpdateTopicArgs, 'title' | 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedTopic = await context.prisma.topic.update({
    where: { id: args.topicId },
    data: { title: args.title },
  });

  const updatedTopics = await context.prisma.topic.findMany({
    where: { spaceId: args.spaceId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('topicsUpdated', updatedTopics);

  return updatedTopic;
};

export default updateTopic;
