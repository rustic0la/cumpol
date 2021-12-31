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

  const topic = await context.prisma.topic.findUnique({
    where: { id: args.topicId },
  });

  const todoList = await context.prisma.todoList.create({
    data: {
      title: args.title,
      topic: { connect: { id: topic?.id } },
    },
  });

  return { ...todoList, todos: [] };
};

export default addTodoList;
