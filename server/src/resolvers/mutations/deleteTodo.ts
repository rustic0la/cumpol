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

  const todoDeleted = await context.prisma.todo.delete({
    where: { id: args.todoId },
  });

  return !!todoDeleted;
};

export default deleteTodo;
