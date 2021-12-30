import { Domain, SubscriptionResolvers } from '../generated/types';
import { Context } from '../interfaces';

const Subscription: SubscriptionResolvers<Context, {}> = {
  domainAdded: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('domainAdded'),
    resolve: (payload: Domain) => {
      return payload;
    },
  },
};

export default Subscription;
