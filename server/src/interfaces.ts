import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

import { Maybe } from './generated/types';

export interface Context {
  prisma: PrismaClient;
  pubsub: PubSub;
  userId?: Maybe<string>;
}
