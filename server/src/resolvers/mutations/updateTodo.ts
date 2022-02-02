import { ForbiddenError } from 'apollo-server-express';

import {
  MutationUpdateTodoArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateTodo: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationUpdateTodoArgs, 'title' | 'todoId' | 'checkListId'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedTodos = await prisma.checkList
    .update({
      where: { id: args.checkListId },
      data: {
        todos: {
          update: {
            where: {
              id: args.todoId,
            },
            data: {
              title: args.title,
              isWatched: args.isWatched || false,
            },
          },
        },
      },
    })
    .todos({
      include: { meta: true },
      orderBy: { createdAt: 'asc' },
    });
  pubsub.publish('todosUpdated', {
    todos: updatedTodos,
    checkListId: args.checkListId,
  });

  return { success: !!updatedTodos, error: null };
};

export default updateTodo;
