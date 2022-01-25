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
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedTodos = await context.prisma.checkList
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
    .todos({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return { success: !!updatedTodos, error: null };
};

export default deleteTodo;
