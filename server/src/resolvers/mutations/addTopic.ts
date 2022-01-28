import { ForbiddenError } from 'apollo-server-express';

import {
  MutationAddTopicArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addTopic: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationAddTopicArgs, 'spaceId' | 'title'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const updatedTopics = await prisma.space
    .update({
      where: { id: args.spaceId },
      data: {
        topics: {
          create: { title: args.title },
        },
      },
    })
    .topics({ orderBy: { createdAt: 'asc' } });
  pubsub.publish('topicsUpdated', updatedTopics);

  return { success: !!updatedTopics, error: null };
};

export default addTopic;
