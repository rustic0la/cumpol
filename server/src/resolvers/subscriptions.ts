import { CheckList, Space, SubscriptionResolvers, Todo, Topic } from '../generated/types';
import { Context } from '../interfaces';

const Subscription: SubscriptionResolvers<Context, {}> = {
  spacesUpdated: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('spacesUpdated'),
    resolve: (payload: Space[]) => payload,
  },
  topicsUpdated: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('topicsUpdated'),
    resolve: (payload: Topic[]) => payload,
  },
  checkListsUpdated: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('checkListsUpdated'),
    resolve: (payload: CheckList[]) => payload,
  },
  todosUpdated: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('todosUpdated'),
    resolve: (payload: Todo[]) => payload,
  },
};

export default Subscription;
