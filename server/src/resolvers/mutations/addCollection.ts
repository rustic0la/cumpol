import { ForbiddenError } from 'apollo-server-express';

import {
  Collection,
  MutationAddCollectionArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addCollection: ResolverFn<
  ResolverTypeWrapper<Collection>,
  {},
  any,
  RequireFields<MutationAddCollectionArgs, 'domainId' | 'title'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const user = await context.prisma.user.findUnique({
    where: { id: context.userId },
    include: {
      domains: {
        where: { id: args.domainId },
      },
    },
  });

  const collection = await context.prisma.collection.create({
    data: { title: args.title, domain: { connect: user?.domains[0] } },
  });

  return { ...collection, todoLists: [] };
};

export default addCollection;
