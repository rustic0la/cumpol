import { PrismaClient } from '@prisma/client';

import { Maybe } from './generated/types';

export interface Context {
  prisma: PrismaClient;
  userId?: Maybe<string>;
}
