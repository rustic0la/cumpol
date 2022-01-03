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

  const space = await context.prisma.space.findUnique({
    where: { id: args.spaceId },
  });

  const topic = await context.prisma.topic.create({
    data: { title: args.title, space: { connect: { id: space?.id } } },
  });

  const updatedTopics = await context.prisma.topic.findMany({
    where: { spaceId: args.spaceId },
    include: {
      todoLists: {
        include: {
          todos: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  context.pubsub.publish('topicsUpdated', updatedTopics);

  return { ...topic, todoLists: [] };
};

export default addTopic;
