import { Context } from '../interfaces';

const getUserByUsername = async (username: string, context: Context) =>
  context.prisma.user.findUnique({
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
