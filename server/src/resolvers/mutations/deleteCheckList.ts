import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteCheckListArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteCheckList: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteCheckListArgs, 'checkListId' | 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedTodos = await context.prisma.todo.deleteMany({
    where: { checkListId: args.checkListId },
  });
  const deletedCheckList = await context.prisma.checkList.delete({
    where: { id: args.checkListId },
  });

  const updatedCheckLists = await context.prisma.topic
    .findUnique({
      where: { id: args.topicId },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('checkListsUpdated', updatedCheckLists);

  return !!deletedTodos && !!deletedCheckList;
};

export default deleteCheckList;
