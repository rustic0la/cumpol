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
> = async (_root, args, ctx: Context) => {
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
};

export default addDomain;
