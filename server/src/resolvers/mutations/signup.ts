import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  AuthPayload,
  Maybe,
  MutationSignupArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';
import { APP_SECRET } from '../../utils';

const signup: ResolverFn<
  Maybe<ResolverTypeWrapper<AuthPayload>>,
  {},
  any,
  RequireFields<MutationSignupArgs, 'password' | 'username'>
> = async (_root, args, context: Context) => {
  const doesUserExist = await context.prisma.user.findUnique({
    where: { username: args.username },
  });

  if (doesUserExist) {
    return {
      error: 'Username is alredy taken',
    };
  }

  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user: { ...user, domains: [] },
  };
};

export default signup;
