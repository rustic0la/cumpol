import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteSpaceArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteSpace: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteSpaceArgs, 'spaceId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedTopics = await context.prisma.topic.deleteMany({
    where: { spaceId: args.spaceId },
  });
  const deletedSpace = await context.prisma.space.delete({ where: { id: args.spaceId } });

  const updatedSpaces = await context.prisma.user
    .findUnique({
      where: { id: context.userId },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
  context.pubsub.publish('spacesUpdated', updatedSpaces);

  return !!deletedSpace && !!deletedTopics;
};

export default deleteSpace;
