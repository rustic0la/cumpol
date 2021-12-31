import { ForbiddenError } from 'apollo-server-express';
import {
  MutationUpdateTodoArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
  Todo,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateTodo: ResolverFn<
  ResolverTypeWrapper<Todo>,
  {},
  Context,
  RequireFields<MutationUpdateTodoArgs, 'title' | 'todoId'>
> = (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.todo.update({
    where: {
      id: args.todoId,
    },
    data: { title: args.title },
  });
};

export default updateTodo;
