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
  Context,
  RequireFields<MutationAddTodoArgs, 'title' | 'todoListId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const todoList = await context.prisma.todoList.findUnique({ where: { id: args.todoListId } });

  const todo = await context.prisma.todo.create({
    data: {
      title: args.title,
      todoList: { connect: { id: todoList?.id } },
    },
  });

  return todo;
};

export default addTodo;
