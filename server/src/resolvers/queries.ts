import { ForbiddenError } from 'apollo-server-express';

import {
  Topic,
  Space,
  Maybe,
  QueryGetTopicsArgs,
  QueryGetSpaceArgs,
  QueryResolvers,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../generated/types';
import { Context } from '../interfaces';

const getSpaces: ResolverFn<ResolverTypeWrapper<Space>[], {}, Context, {}> = (
  _root,
  _args,
  context,
) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  // TODO reduce to id+title
  return context.prisma.space.findMany({
    where: { userId: context.userId },
    orderBy: { createdAt: 'asc' },
    include: {
      topics: {
        orderBy: { createdAt: 'asc' },
        include: {
          todoLists: {
            orderBy: { createdAt: 'asc' },
            include: {
              todos: {
                orderBy: { createdAt: 'asc' },
              },
            },
          },
        },
      },
    },
  });
};

const getSpace: ResolverFn<
  Maybe<ResolverTypeWrapper<Space>>,
  {},
  Context,
  RequireFields<QueryGetSpaceArgs, 'spaceId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.space.findUnique({
    where: { id: args.spaceId },
    include: {
      topics: {
        orderBy: { createdAt: 'asc' },
        include: {
          todoLists: {
            orderBy: { createdAt: 'asc' },
            include: {
              todos: {
                orderBy: { createdAt: 'asc' },
              },
            },
          },
        },
      },
    },
  });
};

const getTopics: ResolverFn<
  ResolverTypeWrapper<Topic>[],
  {},
  Context,
  RequireFields<QueryGetTopicsArgs, 'spaceId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.topic.findMany({
    where: { spaceId: args.spaceId },
    orderBy: { createdAt: 'asc' },
    include: {
      todoLists: {
        orderBy: { createdAt: 'asc' },
        include: {
          todos: {
            orderBy: { createdAt: 'asc' },
          },
        },
      },
    },
  });
};

const Query: QueryResolvers<Context, {}> = {
  // TODO: edit return only id + title
  getSpaces: {
    resolve: getSpaces,
  },
  getSpace: {
    resolve: getSpace,
  },
  getTopics: {
    resolve: getTopics,
  },
};

export default Query;
