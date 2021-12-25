import {
  MutationAddTodoListArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  TodoList,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addTodoList: ResolverFn<
  ResolverTypeWrapper<TodoList>,
  {},
  any,
  RequireFields<MutationAddTodoListArgs, 'collectionId' | 'domainId' | 'title'>
> = async (_root, args, ctx: Context) => {
  const user = await ctx.prisma.user.findUnique({
    where: { id: ctx.userId },
    include: {
      domains: {
        where: { id: args.domainId },
        include: {
          collections: {
            where: { id: args.collectionId },
          },
        },
      },
    },
  });

  const todoList = await ctx.prisma.todoList.create({
    data: {
      title: args.title,
      collection: { connect: user?.domains[0]?.collections[0] },
    },
  });

  return { ...todoList, todos: [] };
};

export default addTodoList;
