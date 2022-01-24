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
  RequireFields<MutationAddTodoArgs, 'title' | 'checkListId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const addedTodo = await context.prisma.todo.create({
    data: {
      title: args.title,
      checkList: { connect: { id: args.checkListId } },
    },
  });

  const updatedTodos = await context.prisma.checkList
    .findUnique({
      where: { id: args.checkListId },
    })
    .todos({
      include: {
        meta: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return addedTodo;
};

export default addTodo;
