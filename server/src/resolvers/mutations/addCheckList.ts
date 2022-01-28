import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddCheckListArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addCheckList: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationAddCheckListArgs, 'topicId' | 'title'>
> = async (_root, args, { userId, prisma, pubsub }: Context) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const addedCheckList = await prisma.checkList.create({
    data: {
      title: args.title,
      topic: { connect: { id: args.topicId } },
    },
  });

  const updatedCheckLists = await prisma.topic
    .findUnique({
      where: { id: args.topicId },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
  pubsub.publish('checkListsUpdated', updatedCheckLists);

  return { success: !!addedCheckList, error: null };
};

export default addCheckList;
