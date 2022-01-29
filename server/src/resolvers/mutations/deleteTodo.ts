import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteTodoArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteTodo: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationDeleteTodoArgs, 'todoId'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedTodos = await prisma.checkList
    .update({
      where: { id: args.checkListId },
      data: {
        todos: {
          delete: {
            id: args.todoId,
          },
        },
      },
    })
    .todos({
      select: { id: true },
      orderBy: { createdAt: 'asc' },
    });
  pubsub.publish('todosIdsUpdated', {
    todosIds: updatedTodos.map(({ id }) => id),
    checkListId: args.checkListId,
  });

  return { success: !!updatedTodos, error: null };
};

export default deleteTodo;
