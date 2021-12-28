import { ForbiddenError } from 'apollo-server-express';

import {
  Collection,
  Domain,
  Maybe,
  QueryGetCollectionsArgs,
  QueryGetDomainArgs,
  QueryResolvers,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../generated/types';
import { Context } from '../interfaces';

export const getDomains: ResolverFn<ResolverTypeWrapper<Domain>[], {}, any, {}> = (
  _root,
  _args,
  context: Context,
) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.domain.findMany({
    where: { userId: context.userId },
    orderBy: { createdAt: 'asc' },
    include: {
      collections: {
        include: {
          todoLists: {
            include: {
              todos: true,
            },
          },
        },
      },
    },
  });
};

export const getDomain: ResolverFn<
  Maybe<ResolverTypeWrapper<Domain>>,
  {},
  any,
  RequireFields<QueryGetDomainArgs, 'domainId'>
> = (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.domain.findUnique({
    where: { id: args.domainId },
    include: {
      collections: {
        include: {
          todoLists: {
            include: {
              todos: true,
            },
          },
        },
      },
    },
  });
};

export const getCollections: ResolverFn<
  ResolverTypeWrapper<Collection>[],
  {},
  any,
  RequireFields<QueryGetCollectionsArgs, 'domainId'>
> = (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.collection.findMany({
    where: { domainId: args.domainId },
    include: {
      todoLists: {
        include: {
          todos: true,
        },
      },
    },
  });
};

const Query: QueryResolvers<any, {}> = {
  getDomains: {
    resolve: getDomains,
  },
  getDomain: {
    resolve: getDomain,
  },
  getCollections: {
    resolve: getCollections,
  },
};

export default Query;
