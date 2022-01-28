import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  AuthPayload,
  MutationSignupArgs,
  RequireFields,
  ResolverFn,
  ResolverTypeWrapper,
} from '../../generated/types';
import { Context } from '../../interfaces';
import { APP_SECRET } from '../../utils/getUserId';

const signup: ResolverFn<
  ResolverTypeWrapper<AuthPayload>,
  {},
  Context,
  RequireFields<MutationSignupArgs, 'password' | 'username'>
> = async (_root, args, { userId, prisma, pubsub }) => {
  const doesUserExist = await prisma.user.findUnique({
    where: { username: args.username },
  });

  if (doesUserExist) {
    return {
      error: 'Username is alredy taken',
    };
  }

  const password = await bcrypt.hash(args.password, 10);

  const user = await prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

export default signup;
