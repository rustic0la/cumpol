import { ForbiddenError } from 'apollo-server-express';

import {
  Maybe,
  MutationDeleteDomainArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deletedomain: ResolverFn<
  Maybe<ResolverTypeWrapper<boolean>>,
  {},
  Context,
  RequireFields<MutationDeleteDomainArgs, 'domainId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedDomain = await context.prisma.domain.delete({ where: { id: args.domainId } });

  return !!deletedDomain;
};

export default deletedomain;
