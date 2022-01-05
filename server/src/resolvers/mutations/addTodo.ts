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

  const addedTodo = await context.prisma.todo.create({
    data: {
      title: args.title,
      todoList: { connect: { id: args.todoListId } },
    },
  });

  const updatedTodos = await context.prisma.todo.findMany({
    where: { todoListId: args.todoListId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return addedTodo;
};

export default addTodo;
