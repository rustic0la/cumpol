import { ForbiddenError } from 'apollo-server-express';

import {
  Maybe,
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

  const deletedCollection = await context.prisma.collection.delete({
    where: { id: args.collectionId },
    include: { todoLists: true },
  });

  return !!deletedCollection;
};

export default deleteCollection;
