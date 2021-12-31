import { Resolvers } from '../generated/types';
import Mutation from './mutations';
import Query from './queries';
import Subscription from './subscriptions';

const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
};

export default resolvers;
