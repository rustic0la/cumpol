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

  const checkListsIds = (
    await context.prisma.topic
      .findUnique({
        where: { id: args.topicId },
      })
      .checkLists({ select: { id: true } })
  ).map(({ id }) => id);

  const deletedTodos = await context.prisma.todo.deleteMany({
    where: { checkListId: { in: checkListsIds } },
  });
  const deletedCheckLists = await context.prisma.checkList.deleteMany({
    where: { id: { in: checkListsIds } },
  });
  const deletedTopic = await context.prisma.topic.delete({
    where: { id: args.topicId },
  });

  const updatedTopics = await context.prisma.space
    .findUnique({
      where: { id: args.spaceId },
    })
    .topics({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('topicsUpdated', updatedTopics);

  return { success: !!deletedTodos && !!deletedCheckLists && !!deletedTopic, error: null };
};

export default deleteTopic;
