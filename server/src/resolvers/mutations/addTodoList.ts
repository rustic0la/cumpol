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
  RequireFields<MutationAddTodoListArgs, 'collectionId' | 'title'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const collection = await context.prisma.collection.findUnique({
    where: { id: args.collectionId },
  });

  const todoList = await context.prisma.todoList.create({
    data: {
      title: args.title,
      collection: { connect: { id: collection?.id } },
    },
  });

  return { ...todoList, todos: [] };
};

export default addTodoList;
