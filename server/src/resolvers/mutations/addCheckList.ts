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

  const updatedCheckLists = await prisma.topic
    .update({
      where: { id: args.topicId },
      data: {
        checkLists: {
          create: {
            title: args.title,
          },
        },
      },
    })
    .checkLists({ select: { id: true }, orderBy: { createdAt: 'asc' } });
  pubsub.publish(
    'checkListsIdsUpdated',
    updatedCheckLists.map(({ id }) => id),
  );

  return { success: !!updatedCheckLists, error: null };
};

export default addCheckList;
