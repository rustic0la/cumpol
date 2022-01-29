import { Space, SubscriptionResolvers } from '../generated/types';
import { Context } from '../interfaces';

const Subscription: SubscriptionResolvers<Context, {}> = {
  spacesUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('spacesIdsUpdated'),
    resolve: (payload: Space[]) => payload,
  },
  topicsIdsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('topicsIdsUpdated'),
    resolve: (payload: string[]) => payload,
  },
  checkListsIdsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('checkListsIdsUpdated'),
    resolve: (payload: string[]) => payload,
  },
  todosIdsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('todosIdsUpdated'),
    resolve: (payload: string[]) => payload,
  },
};

export default Subscription;
