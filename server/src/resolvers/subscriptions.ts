import { Space, SubscriptionResolvers } from '../generated/types';
import { Context } from '../interfaces';

const Subscription: SubscriptionResolvers<Context, {}> = {
  spaceAdded: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('spaceAdded'),
    resolve: (payload: Space) => {
      return payload;
    },
  },
};

export default Subscription;
