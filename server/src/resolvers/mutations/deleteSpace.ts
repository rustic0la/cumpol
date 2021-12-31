import { ForbiddenError } from 'apollo-server-express';

import {
  Maybe,
  MutationDeleteSpaceArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const deleteSpace: ResolverFn<
  ResolverTypeWrapper<boolean>,
  {},
  Context,
  RequireFields<MutationDeleteSpaceArgs, 'spaceId'>
> = async (_root, args, context) => {
  if (!context.userId) throw new ForbiddenError('you must be logged in');

  const deletedSpace = await context.prisma.space.delete({ where: { id: args.spaceId } });

  return !!deletedSpace;
};

export default deleteSpace;
