import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteTopicArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteTopic: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteTopicArgs, 'topicId' | 'spaceId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const todoListsIds = (
    await context.prisma.todoList.findMany({
      where: { topicId: args.topicId },
    })
  ).map(({ id }) => id);

  const deletedTodos = await context.prisma.todo.deleteMany({
    where: { todoListId: { in: todoListsIds } },
  });
  const deletedTodoLists = await context.prisma.todoList.deleteMany({
    where: { id: { in: todoListsIds } },
  });
  const deletedTopic = await context.prisma.topic.delete({
    where: { id: args.topicId },
  });

  const updatedTopics = await context.prisma.topic.findMany({
    where: { spaceId: args.spaceId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('topicsUpdated', updatedTopics);

  return !!deletedTodos && !!deletedTodoLists && !!deletedTopic;
};

export default deleteTopic;
