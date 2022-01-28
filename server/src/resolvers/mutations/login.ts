import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  AuthPayload,
  MutationLoginArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';
import { APP_SECRET } from '../../utils/getUserId';

const login: ResolverFn<
  ResolverTypeWrapper<AuthPayload>,
  {},
  Context,
  RequireFields<MutationLoginArgs, 'password' | 'username'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  const user = await prisma.user.findUnique({
    where: { username: args.username },
  });

  if (!user) {
    return {
      token: null,
      user: null,
      error: 'No user found',
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
