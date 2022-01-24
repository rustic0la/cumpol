import { ForbiddenError } from 'apollo-server-express';

import {
  CheckList,
  MutationAddCheckListArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addCheckList: ResolverFn<
  ResolverTypeWrapper<CheckList>,
  {},
  Context,
  RequireFields<MutationAddCheckListArgs, 'topicId' | 'title'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const addedCheckList = await context.prisma.checkList.create({
    data: {
      title: args.title,
      topic: { connect: { id: args.topicId } },
    },
  });

  const updatedCheckLists = await context.prisma.topic
    .findUnique({
      where: { id: args.topicId },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('checkListsUpdated', updatedCheckLists);

  return addedCheckList;
};

export default addCheckList;
