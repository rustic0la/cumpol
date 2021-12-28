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
  RequireFields<MutationAddTodoListArgs, 'collectionId' | 'domainId' | 'title'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const user = await context.prisma.user.findUnique({
    where: { id: context.userId },
    include: {
      domains: {
        where: { id: args.domainId },
        include: {
          collections: {
            where: { id: args.collectionId },
          },
        },
      },
    },
  });

  const todoList = await context.prisma.todoList.create({
    data: {
      title: args.title,
      collection: { connect: user?.domains[0]?.collections[0] },
    },
  });

  return { ...todoList, todos: [] };
};

export default addTodoList;
