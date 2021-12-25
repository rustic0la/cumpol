//       if (!user) return new ForbiddenError("Not Authorized");
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Resolvers } from '../generated/types';
import { Context } from '../interfaces';
import { APP_SECRET } from '../utils';

const resolvers: Resolvers = {
  Query: {
    getDomains: {
      resolve: (_root, _args, ctx: Context) =>
        ctx.prisma.domain.findMany({
          where: { userId: ctx.userId },
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
        }),
    },
    getDomain: {
      resolve: (_root, args, ctx: Context) =>
        ctx.prisma.domain.findUnique({
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
        }),
    },
    getCollections: {
      resolve: (_root, args, ctx: Context) =>
        ctx.prisma.collection.findMany({
          where: { domainId: args.domainId },
          include: {
            todoLists: {
              include: {
                todos: true,
              },
            },
          },
        }),
    },
  },
  Mutation: {
    addDomain: {
      resolve: async (_root, args, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.userId },
        });

        const domain = await ctx.prisma.domain.create({
          data: { title: args.title, user: { connect: { username: user?.username } } },
          include: {
            collections: true,
          },
        });

        return { ...domain, collections: [] };
      },
    },
    addCollection: {
      resolve: async (_root, args, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.userId },
          include: {
            domains: {
              where: { id: args.domainId },
            },
          },
        });

        const collection = await ctx.prisma.collection.create({
          data: { title: args.title, domain: { connect: user?.domains[0] } },
        });

        return { ...collection, todoLists: [] };
      },
    },
    addTodoList: {
      resolve: async (_root, args, ctx: Context) => {
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
      },
    },
    addTodo: {
      resolve: async (_root, args, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.userId },
          include: {
            domains: {
              where: { id: args.domainId },
              include: {
                collections: {
                  where: { id: args.collectionId },
                  include: {
                    todoLists: {
                      where: { id: args.todoListId },
                    },
                  },
                },
              },
            },
          },
        });

        const todo = await ctx.prisma.todo.create({
          data: {
            title: args.title,
            todoList: { connect: user?.domains[0]?.collections[0]?.todoLists[0] },
          },
        });

        return todo;
      },
    },
    signup: {
      resolve: async (_root, args, ctx: Context) => {
        const password = await bcrypt.hash(args.password, 10);

        const user = await ctx.prisma.user.create({ data: { ...args, password } });

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return {
          token,
          user: {
            ...user,
            domains: [],
          },
        };
      },
    },
    login: {
      resolve: async (_root, args, ctx: Context) => {
        const user = await ctx.prisma.user.findUnique({
          where: { username: args.username },
          include: {
            domains: {
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
            },
          },
        });

        if (!user) {
          throw new Error('No such user found');
        }

        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return {
          token,
          user,
        };
      },
    },
  },
};

export default resolvers;
