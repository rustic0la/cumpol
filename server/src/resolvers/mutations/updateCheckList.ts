import { ForbiddenError } from 'apollo-server-express';

import {
  CheckList,
  MutationUpdateCheckListArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateCheckList: ResolverFn<
  ResolverTypeWrapper<CheckList>,
  {},
  Context,
  RequireFields<MutationUpdateCheckListArgs, 'title' | 'checkListId' | 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedCheckList = await context.prisma.checkList.update({
    where: {
      id: args.checkListId,
    },
    data: { title: args.title },
  });

  const updatedCheckLists = await context.prisma.topic
    .findUnique({
      where: { id: args.topicId },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('checkListsUpdated', updatedCheckLists);

  return updatedCheckList;
};

export default updateCheckList;
