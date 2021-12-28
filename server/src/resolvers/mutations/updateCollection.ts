import { ForbiddenError } from 'apollo-server-express';

import {
  Collection,
  MutationUpdateCollectionArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateCollection: ResolverFn<
  ResolverTypeWrapper<Collection>,
  {},
  Context,
  RequireFields<MutationUpdateCollectionArgs, 'title' | 'collectionId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.collection.update({
    where: { id: args.collectionId },
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

export default updateCollection;
