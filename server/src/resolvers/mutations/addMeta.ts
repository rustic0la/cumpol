import { ForbiddenError } from 'apollo-server-express';
import metaFetcher from 'meta-fetcher';
import { parse } from 'url';

import {
  Meta,
  MutationAddMetaArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';

const addMeta: ResolverFn<
  ResolverTypeWrapper<Meta>,
  {},
  Context,
  RequireFields<MutationAddMetaArgs, 'todoId' | 'url'>
> = async (_root, args, { userId, prisma }) => {
  if (!userId) throw new ForbiddenError('you must be logged in');

  let link = args.url;
  if (!parse(link).protocol) link = `https://${link}`;

  const data = await metaFetcher(link).then((res) => ({
    url: res.metadata.website,
    title: res.metadata.title,
    description: res.metadata.description,
    img: res.metadata.banner || '',
    hostname: parse(link).hostname,
    favicon: res.favicons[0] || '',
  }));

  const createdMeta = await prisma.meta.create({
    data: { ...data, todo: { connect: { id: args.todoId } } },
  });

  return createdMeta;
};

export default addMeta;
