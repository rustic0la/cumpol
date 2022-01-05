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

  const todosDeleted = await context.prisma.todo.deleteMany({
    where: { todoListId: args.todoListId },
  });
  const todoListDeleted = await context.prisma.todoList.delete({
    where: { id: args.todoListId },
  });

  const todoLists = await context.prisma.todoList.findMany({ where: { topicId: args.topicId } });
  console.log('todoLists', todoLists);

  context.pubsub.publish('todoListsUpdated', todoLists);

  return !!todosDeleted && !!todoListDeleted;
};

export default deleteTodoList;
