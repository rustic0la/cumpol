import { ForbiddenError } from 'apollo-server-express';

import {
  Topic,
  MutationUpdateTopicArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateTopic: ResolverFn<
  ResolverTypeWrapper<Topic>,
  {},
  Context,
  RequireFields<MutationUpdateTopicArgs, 'title' | 'topicId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.topic.update({
    where: { id: args.topicId },
    data: { title: args.title },
    include: {
      todoLists: {
        include: {
          todos: true,
        },
      },
    },
  });
};

export default updateTopic;
