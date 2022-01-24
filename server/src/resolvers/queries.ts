import { ForbiddenError } from 'apollo-server-express';

import {
  CheckList,
  QueryGetCheckListsArgs,
  QueryGetTodosArgs,
  QueryGetTopicsArgs,
  QueryResolvers,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Space,
  Todo,
  Topic,
} from '../generated/types';
import { Context } from '../interfaces';

const getSpaces: ResolverFn<ResolverTypeWrapper<Space>[], {}, Context, {}> = (
  _root,
  _args,
  context,
) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.user
    .findUnique({
      where: { id: context.userId },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
};

const getTopics: ResolverFn<
  ResolverTypeWrapper<Topic>[],
  {},
  Context,
  RequireFields<QueryGetTopicsArgs, 'spaceId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.space
    .findUnique({
      where: { id: args.spaceId },
    })
    .topics({ orderBy: { createdAt: 'asc' } });
};

const getCheckLists: ResolverFn<
  ResolverTypeWrapper<CheckList>[],
  {},
  Context,
  RequireFields<QueryGetCheckListsArgs, 'topicId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.topic
    .findUnique({
      where: { id: args.topicId },
    })
    .checkLists({ orderBy: { createdAt: 'asc' } });
};

const getTodos: ResolverFn<
  ResolverTypeWrapper<Todo>[],
  {},
  Context,
  RequireFields<QueryGetTodosArgs, 'checkListId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.checkList
    .findUnique({
      where: { id: args.checkListId },
    })
    .todos({ include: { meta: true }, orderBy: { createdAt: 'asc' } });
};

const Query: QueryResolvers<Context, {}> = {
  getSpaces: {
    resolve: getSpaces,
  },
  getTopics: {
    resolve: getTopics,
  },
  getCheckLists: {
    resolve: getCheckLists,
  },
  getTodos: {
    resolve: getTodos,
  },
};

export default Query;
