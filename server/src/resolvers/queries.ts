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

const getDomains: ResolverFn<ResolverTypeWrapper<Domain>[], {}, Context, {}> = (
  _root,
  _args,
  context,
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

const getDomain: ResolverFn<
  Maybe<ResolverTypeWrapper<Domain>>,
  {},
  Context,
  RequireFields<QueryGetDomainArgs, 'domainId'>
> = (_root, args, context) => {
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

const getCollections: ResolverFn<
  ResolverTypeWrapper<Collection>[],
  {},
  Context,
  RequireFields<QueryGetCollectionsArgs, 'domainId'>
> = (_root, args, context) => {
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

const Query: QueryResolvers<Context, {}> = {
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
