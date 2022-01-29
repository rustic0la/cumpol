import { ForbiddenError } from 'apollo-server-express';

import {
  CheckList,
  Maybe,
  QueryGetCheckListByIdArgs,
  QueryGetCheckListsIdsArgs,
  QueryGetTodoByIdArgs,
  QueryGetTodosIdsArgs,
  QueryGetTopicByIdArgs,
  QueryGetTopicsIdsArgs,
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
    include: { checkLists: { select: { id: true } } },
  });

  if (topic) {
    return {
      ...topic,
      checkListsIds: topic?.checkLists.map(({ id }) => id) || [],
    };
  }
  return null;
};

const getCheckListsIds: ResolverFn<
  ResolverTypeWrapper<string>[],
  {},
  Context,
  RequireFields<QueryGetCheckListsIdsArgs, 'topicId'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const checkLists = await prisma.topic
    .findUnique({
      where: { id: args.topicId },
    })
    .checkLists({ select: { id: true }, orderBy: { createdAt: 'asc' } });

  return checkLists.map(({ id }) => id);
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
    include: { todos: { select: { id: true } } },
  });

  if (checkList) {
    return {
      ...checkList,
      todosIds: checkList?.todos.map(({ id }) => id) || [],
    };
  }
  return null;
};

const getTodosIds: ResolverFn<
  ResolverTypeWrapper<string>[],
  {},
  Context,
  RequireFields<QueryGetTodosIdsArgs, 'checkListId'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  const checkLists = await prisma.checkList
    .findUnique({
      where: { id: args.checkListId },
    })
    .todos({ select: { id: true }, orderBy: { createdAt: 'asc' } });

  return checkLists.map(({ id }) => id);
};

const getTodoById: ResolverFn<
  Maybe<ResolverTypeWrapper<Todo>>,
  {},
  Context,
  RequireFields<QueryGetTodoByIdArgs, 'todoId'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  return prisma.todo.findUnique({
    where: {
      id: args.todoId,
    },
    include: { meta: true },
  });
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
  getCheckListsIds: {
    resolve: getCheckListsIds,
  },
  getCheckListById: {
    resolve: getCheckListById,
  },
  getTodosIds: {
    resolve: getTodosIds,
  },
  getTodoById: {
    resolve: getTodoById,
  },
};

export default Query;
