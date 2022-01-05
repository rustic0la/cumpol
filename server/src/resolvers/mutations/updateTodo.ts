import { ForbiddenError } from 'apollo-server-express';
import {
  MutationUpdateTodoArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Todo,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateTodo: ResolverFn<
  ResolverTypeWrapper<Todo>,
  {},
  Context,
  RequireFields<MutationUpdateTodoArgs, 'title' | 'todoId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedTodo = await context.prisma.todo.update({
    where: {
      id: args.todoId,
    },
    data: { title: args.title },
  });

  const updatedTodos = await context.prisma.todo.findMany({
    where: { todoListId: args.todoListId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return updatedTodo;
};

export default updateTodo;
