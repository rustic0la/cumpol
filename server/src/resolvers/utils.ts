import { Context } from '../interfaces';

const getUserByUsername = async (username: string, ctx: Context) =>
  ctx.prisma.user.findUnique({
    where: { username },
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

export default getUserByUsername;
