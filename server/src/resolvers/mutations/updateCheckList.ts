import { ForbiddenError } from 'apollo-server-express';

import {
  MutationUpdateCheckListArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateCheckList: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationUpdateCheckListArgs, 'title' | 'checkListId' | 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedCheckLists = await context.prisma.topic
    .update({
      where: { id: args.topicId },
      data: {
        checkLists: {
          update: {
            where: {
              id: args.checkListId,
            },
            data: { title: args.title },
          },
        },
      },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('checkListsUpdated', updatedCheckLists);

  return { success: !!updatedCheckLists, error: null };
};

export default updateCheckList;
