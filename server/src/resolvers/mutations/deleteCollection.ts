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
  Maybe<ResolverTypeWrapper<boolean>>,
  {},
  any,
  RequireFields<MutationDeleteCollectionArgs, 'collectionId'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedCollection = await context.prisma.collection.delete({
    where: { id: args.collectionId },
  });

  return !!deletedCollection;
};

export default deleteCollection;
