import { ForbiddenError } from 'apollo-server-express';

import {
  Domain,
  MutationAddDomainArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addDomain: ResolverFn<
  ResolverTypeWrapper<Domain>,
  {},
  any,
  RequireFields<MutationAddDomainArgs, 'title'>
> = async (_root, args, context: Context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const user = await context.prisma.user.findUnique({
    where: { id: context.userId },
  });

  const domain = await context.prisma.domain.create({
    data: { title: args.title, user: { connect: { username: user?.username } } },
    include: {
      collections: true,
    },
  });

  return { ...domain, collections: [] };
};

export default addDomain;
