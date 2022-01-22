import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteTodoArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteTodo: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteTodoArgs, 'todoId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedTodo = await context.prisma.todo.delete({
    where: { id: args.todoId },
  });

  const updatedTodos = await context.prisma.todo.findMany({
    where: { checkListId: args.checkListId },
    orderBy: { createdAt: 'asc' },
  });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return !!deletedTodo;
};

export default deleteTodo;
