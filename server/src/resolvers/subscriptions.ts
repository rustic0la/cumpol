import { Space, SubscriptionResolvers, Topic, TodoList } from '../generated/types';
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
  todoListsUpdated: {
    subscribe: (_root: any, _args: any, context: Context) =>
      context.pubsub.asyncIterator('todoListsUpdated'),
    resolve: (payload: TodoList[]) => payload,
  },
};

export default Subscription;
