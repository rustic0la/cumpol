import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteCheckListArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteCheckList: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationDeleteCheckListArgs, 'checkListId' | 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const updatedCheckLists = await context.prisma.topic
    .update({
      where: { id: args.topicId },
      data: {
        checkLists: {
          delete: {
            id: args.checkListId,
          },
        },
      },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('checkListsUpdated', updatedCheckLists);

  return { success: !!updatedCheckLists, error: null };
};

export default deleteCheckList;
