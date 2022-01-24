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

  const deletedMeta = await context.prisma.meta.deleteMany({ where: { todoId: args.todoId } });
  const deletedTodo = await context.prisma.todo.delete({
    where: { id: args.todoId },
  });

  const updatedTodos = await context.prisma.checkList
    .findUnique({
      where: { id: args.checkListId },
    })
    .todos({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return !!deletedMeta && !!deletedTodo;
};

export default deleteTodo;
