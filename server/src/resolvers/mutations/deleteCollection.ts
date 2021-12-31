import { ForbiddenError } from 'apollo-server-express';

import {
  MutationDeleteCollectionArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteCollection: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteCollectionArgs, 'collectionId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const todoListsDeleted = await context.prisma.todoList.deleteMany({
    where: { collectionId: args.collectionId },
  });

  const collectionDeleted = await context.prisma.collection.delete({
    where: { id: args.collectionId },
  });

  return !!todoListsDeleted && !!collectionDeleted;
};

export default deleteCollection;
