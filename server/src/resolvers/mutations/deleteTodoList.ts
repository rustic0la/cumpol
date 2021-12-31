import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteTodoListArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteTodoList: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteTodoListArgs, 'todoListId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const todosDeleted = await context.prisma.todo.deleteMany({
    where: { todoListId: args.todoListId },
  });

  const todoListDeleted = await context.prisma.todoList.delete({
    where: { id: args.todoListId },
  });

  return !!todosDeleted && !!todoListDeleted;
};

export default deleteTodoList;
