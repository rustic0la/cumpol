import { Context } from '../interfaces';

const domainAdded = (_root: any, _args: any, context: Context) =>
  context.pubsub.asyncIterator('domainAdded');

const Subscription = {
  domainAdded: {
    subscribe: domainAdded,
  },
};

export default Subscription;
