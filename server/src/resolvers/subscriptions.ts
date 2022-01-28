import { CheckList, Space, SubscriptionResolvers, Todo, Topic } from '../generated/types';
import { Context } from '../interfaces';

const Subscription: SubscriptionResolvers<Context, {}> = {
  spacesUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('spacesUpdated'),
    resolve: (payload: Space[]) => payload,
  },
  topicsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('topicsUpdated'),
    resolve: (payload: Topic[]) => payload,
  },
  checkListsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('checkListsUpdated'),
    resolve: (payload: CheckList[]) => payload,
  },
  todosUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('todosUpdated'),
    resolve: (payload: Todo[]) => payload,
  },
};

export default Subscription;
