import { ForbiddenError } from 'apollo-server-express';

import {
  Space,
  QueryResolvers,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  QueryGetTopicsArgs,
  Topic,
  TodoList,
  QueryGetTodoListsArgs,
  QueryGetTodosArgs,
  Todo,
} from '../generated/types';
import { Context } from '../interfaces';

const getSpaces: ResolverFn<ResolverTypeWrapper<Space>[], {}, Context, {}> = (
  _root,
  _args,
  context,
) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.space.findMany({
    where: { userId: context.userId },
    orderBy: { createdAt: 'asc' },
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
  });
};

const getTodoLists: ResolverFn<
  ResolverTypeWrapper<TodoList>[],
  {},
  Context,
  RequireFields<QueryGetTodoListsArgs, 'topicId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.todoList.findMany({
    where: { topicId: args.topicId },
    orderBy: { createdAt: 'asc' },
  });
};

const getTodos: ResolverFn<
  ResolverTypeWrapper<Todo>[],
  {},
  Context,
  RequireFields<QueryGetTodosArgs, 'todoListId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.todo.findMany({
    where: { todoListId: args.todoListId },
    orderBy: { createdAt: 'asc' },
  });
};

const Query: QueryResolvers<Context, {}> = {
  getSpaces: {
    resolve: getSpaces,
  },
  getTopics: {
    resolve: getTopics,
  },
  getTodoLists: {
    resolve: getTodoLists,
  },
  getTodos: {
    resolve: getTodos,
  },
};

export default Query;
