import { ForbiddenError } from 'apollo-server-express';

import {
  Topic,
  MutationAddTopicArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addTopic: ResolverFn<
  ResolverTypeWrapper<Topic>,
  {},
  Context,
  RequireFields<MutationAddTopicArgs, 'spaceId' | 'title'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const topic = await context.prisma.topic.create({
    data: { title: args.title, space: { connect: { id: args.spaceId } } },
  });

  const updatedTopics = await context.prisma.topic.findMany({
    where: { spaceId: args.spaceId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('topicsUpdated', updatedTopics);

  return topic;
};

export default addTopic;
