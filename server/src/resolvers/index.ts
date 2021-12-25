//       if (!user) return new ForbiddenError("Not Authorized");

import { Resolvers } from '../generated/types';
import Mutation from './mutations';
import Query from './queries';

const resolvers: Resolvers = {
  Query,
  Mutation,
};

export default resolvers;
