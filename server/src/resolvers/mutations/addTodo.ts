import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddTodoArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Todo,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addTodo: ResolverFn<
  ResolverTypeWrapper<Todo>,
  {},
  any,
  RequireFields<MutationAddTodoArgs, 'title' | 'todoListId' | 'collectionId' | 'domainId'>
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
            include: {
              todoLists: {
                where: { id: args.todoListId },
              },
            },
          },
        },
      },
    },
  });

  const todo = await context.prisma.todo.create({
    data: {
      title: args.title,
      todoList: { connect: user?.domains[0]?.collections[0]?.todoLists[0] },
    },
  });

  return todo;
};

export default addTodo;
