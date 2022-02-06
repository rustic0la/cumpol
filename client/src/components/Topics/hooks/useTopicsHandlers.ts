import {
  TopicsIdsUpdatedDocument,
  TopicsIdsUpdatedSubscription,
  useGetTopicsIdsQuery,
} from '@gql/types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface SubscriptionData {
  subscriptionData: {
    data: TopicsIdsUpdatedSubscription;
  };
}

export const useTopicsHandlers = () => {
  const { spaceId = '' } = useParams();

  const { data, loading, subscribeToMore } = useGetTopicsIdsQuery({
    variables: { spaceId },
  });

  useEffect(
    () =>
      subscribeToMore({
        document: TopicsIdsUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          const newData = subscriptionData.data;
          if (!newData) return prev;
          const { topicsIdsUpdated } = newData;

          if (spaceId === topicsIdsUpdated.spaceId) {
            return {
              getTopicsIds: topicsIdsUpdated.topicsIds || [],
            };
          }
          return {
            getTopicsIds: prev.getTopicsIds,
          };
        },
      }),
    [spaceId, subscribeToMore],
  );

  return { loading, topicsIds: data?.getTopicsIds || [], spaceId };
};
