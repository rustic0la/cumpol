import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteTopicArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteTopic: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteTopicArgs, 'topicId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const todoListsDeleted = await context.prisma.todoList.deleteMany({
    where: { topicId: args.topicId },
  });

  const topicDeleted = await context.prisma.topic.delete({
    where: { id: args.topicId },
  });

  return !!todoListsDeleted && !!topicDeleted;
};

export default deleteTopic;
