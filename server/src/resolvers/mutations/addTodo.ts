import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddTodoArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addTodo: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationAddTodoArgs, 'title' | 'checkListId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedTodos = await context.prisma.checkList
    .update({
      where: { id: args.checkListId },
      data: {
        todos: {
          create: {
            title: args.title,
          },
        },
      },
    })
    .todos({
      include: {
        meta: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return { success: !!updatedTodos, error: null };
};

export default addTodo;
