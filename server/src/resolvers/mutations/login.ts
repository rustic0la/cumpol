import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  AuthPayload,
  Maybe,
  MutationLoginArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';
import { APP_SECRET } from '../../utils';
import getUserByUsername from '../utils';

const login: ResolverFn<
  Maybe<ResolverTypeWrapper<AuthPayload>>,
  {},
  any,
  RequireFields<MutationLoginArgs, 'password' | 'username'>
> = async (_root, args, ctx: Context) => {
  const user = await getUserByUsername(args.username, ctx);

  if (!user) {
    return {
      token: null,
      user: null,
      error: 'No such user found',
    };
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    return {
      token: null,
      user: null,
      error: 'Invalid password',
    };
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

export default login;
