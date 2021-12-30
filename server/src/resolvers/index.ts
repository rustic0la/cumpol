//       if (!user) return new ForbiddenError("Not Authorized");
import { Resolvers } from '../generated/types';
import Mutation from './mutations';
import Query from './queries';
import Subscription from './subscriptions';

const resolvers: Resolvers = {
  Query,
  Mutation,
  // @ts-ignore
  Subscription,
};

export default resolvers;
