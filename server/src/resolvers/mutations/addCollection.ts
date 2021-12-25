import {
  Collection,
  MutationAddCollectionArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addCollection: ResolverFn<
  ResolverTypeWrapper<Collection>,
  {},
  any,
  RequireFields<MutationAddCollectionArgs, 'domainId' | 'title'>
> = async (_root, args, ctx: Context) => {
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
};

export default addCollection;
