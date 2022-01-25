import { ForbiddenError } from 'apollo-server-express';
import metaFetcher from 'meta-fetcher';
import parse from 'url-parse';

import {
  MutationUpdateTodoArgs,
  Payload,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';
import isValidURL from '../../utils/isValidUrl';

// const parseMeta = () => {

// }

const updateTodo: ResolverFn<
  ResolverTypeWrapper<Payload>,
  {},
  Context,
  RequireFields<MutationUpdateTodoArgs, 'title' | 'todoId' | 'checkListId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  let string = args.title;
  let meta;
  let data;
  if (isValidURL(string)) {
    if (!parse(string).protocol) string = `https://${string}`;

    const res = await metaFetcher(string).catch((e) => console.log(e));

    if (res) {
      data = {
        url: res.metadata.website,
        title: res.metadata.title,
        description: res.metadata.description,
        img: res.metadata.banner || '',
        hostname: parse(string).hostname,
        favicon: res.favicons[0] || '',
      };

      const todo = await context.prisma.todo.findUnique({
        where: { id: args.todoId },
        include: {
          meta: {
            select: {
              id: true,
              url: true,
              title: true,
              description: true,
              img: true,
              todoId: true,
              hostname: true,
            },
          },
        },
      });

      if (todo?.meta) {
        meta = await context.prisma.meta.update({ where: { todoId: todo.id }, data });
      } else {
        meta = await context.prisma.meta.create({
          data: { ...data, todo: { connect: { id: todo?.id } } },
        });
      }
    }
  }

  const updatedTodos = await context.prisma.checkList
    .update({
      where: { id: args.checkListId },
      data: {
        todos: {
          update: {
            where: {
              id: args.todoId,
            },
            data: {
              title: meta?.title || args.title,
              ...(meta && { meta: { update: { ...data } } }),
            },
          },
        },
      },
    })
    .todos({
      include: {
        meta: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  context.pubsub.publish('todosUpdated', updatedTodos);

  return { success: !!updatedTodos, error: null };
};

export default updateTodo;
