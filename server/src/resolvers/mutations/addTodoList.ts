import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddTodoListArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  TodoList,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addTodoList: ResolverFn<
  ResolverTypeWrapper<TodoList>,
  {},
  Context,
  RequireFields<MutationAddTodoListArgs, 'topicId' | 'title'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const todoList = await context.prisma.todoList.create({
    data: {
      title: args.title,
      topic: { connect: { id: args.topicId } },
    },
  });

  const todoLists = await context.prisma.todoList.findMany({
    where: { topicId: args.topicId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('todoListsUpdated', todoLists);

  return todoList;
};

export default addTodoList;
