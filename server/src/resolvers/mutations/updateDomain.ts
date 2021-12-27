import { ForbiddenError } from 'apollo-server-express';

import {
  Domain,
  MutationUpdateDomainArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const updateDomain: ResolverFn<
  ResolverTypeWrapper<Domain>,
  {},
  any,
  RequireFields<MutationUpdateDomainArgs, 'domainId' | 'title'>
> = (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  return context.prisma.domain.update({
    where: { id: args.domainId },
    data: { title: args.title },
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
  });
};

export default updateDomain;
