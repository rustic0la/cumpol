import {
  CheckListsIdsUpdatedPayload,
  Space,
  SubscriptionResolvers,
  TodosUpdatedPayload,
  TopicsIdsUpdatedPayload,
} from '../generated/types';
import { Context } from '../interfaces';

const Subscription: SubscriptionResolvers<Context, {}> = {
  spacesUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('spacesUpdated'),
    resolve: (payload: Space[]) => payload,
  },
  topicsIdsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('topicsIdsUpdated'),
    resolve: (payload: TopicsIdsUpdatedPayload) => payload,
  },
  checkListsIdsUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('checkListsIdsUpdated'),
    resolve: (payload: CheckListsIdsUpdatedPayload) => payload,
  },
  todosUpdated: {
    subscribe: (_root: any, _args: any, { pubsub }: Context) =>
      pubsub.asyncIterator('todosUpdated'),
    resolve: (payload: TodosUpdatedPayload) => payload,
  },
};

export default Subscription;
