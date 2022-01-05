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
  RequireFields<MutationDeleteTodoListArgs, 'todoListId' | 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedTodos = await context.prisma.todo.deleteMany({
    where: { todoListId: args.todoListId },
  });
  const deletedTodoList = await context.prisma.todoList.delete({
    where: { id: args.todoListId },
  });

  const updatedTodoLists = await context.prisma.todoList.findMany({
    where: { topicId: args.topicId },
  });
  context.pubsub.publish('todoListsUpdated', updatedTodoLists);

  return !!deletedTodos && !!deletedTodoList;
};

export default deleteTodoList;
