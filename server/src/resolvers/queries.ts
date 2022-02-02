import { ForbiddenError } from 'apollo-server-express';

import {
  CheckList,
  Maybe,
  QueryGetCheckListByIdArgs,
  QueryGetTopicByIdArgs,
  QueryGetTopicsIdsArgs,
  QueryResolvers,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Space,
  Topic,
} from '../generated/types';
import { Context } from '../interfaces';

const getSpaces: ResolverFn<ResolverTypeWrapper<Space>[], {}, Context, {}> = (
  _root,
  _args,
  { userId, prisma },
) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  return prisma.user
    .findUnique({
      where: { id: userId },
    })
    .spaces({ orderBy: { createdAt: 'asc' } });
};

const getTopicsIds: ResolverFn<
  ResolverTypeWrapper<string>[],
  {},
  Context,
  RequireFields<QueryGetTopicsIdsArgs, 'spaceId'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const topics = await prisma.space
    .findUnique({
      where: { id: args.spaceId },
    })
    .topics({ select: { id: true }, orderBy: { createdAt: 'asc' } });

  return topics.map(({ id }) => id);
};

const getTopicById: ResolverFn<
  Maybe<ResolverTypeWrapper<Topic>>,
  {},
  Context,
  RequireFields<QueryGetTopicByIdArgs, 'topicId'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const topic = await prisma.topic.findUnique({
    where: {
      id: args.topicId,
    },
    include: { checkLists: { select: { id: true }, orderBy: { createdAt: 'asc' } } },
  });

  if (topic) {
    return {
      ...topic,
      checkListsIds: topic?.checkLists.map(({ id }) => id) || [],
    };
  }
  return null;
};

const getCheckListById: ResolverFn<
  Maybe<ResolverTypeWrapper<CheckList>>,
  {},
  Context,
  RequireFields<QueryGetCheckListByIdArgs, 'checkListId'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const checkList = await prisma.checkList.findUnique({
    where: {
      id: args.checkListId,
    },
    include: { todos: { include: { meta: true }, orderBy: { createdAt: 'asc' } } },
  });

  return checkList;
};

const Query: QueryResolvers<Context, {}> = {
  getSpaces: {
    resolve: getSpaces,
  },
  getTopicsIds: {
    resolve: getTopicsIds,
  },
  getTopicById: {
    resolve: getTopicById,
  },
  getCheckListById: {
    resolve: getCheckListById,
  },
};

export default Query;
