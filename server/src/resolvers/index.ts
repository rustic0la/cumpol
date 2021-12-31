import { Resolvers } from '../generated/types';
import Mutation from './mutations';
import Query from './queries';
import Subscription from './subscriptions';

// TODO: errors enum, errors handling, processing at client

const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
};

export default resolvers;
