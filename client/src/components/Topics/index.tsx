import {
  TopicsIdsUpdatedDocument,
  TopicsIdsUpdatedSubscription,
  useGetTopicsIdsQuery,
} from '@gql/types';
import React, { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AddTopic from './AddTopic';
import { TopicsStyled } from './styles';
import Topic from './TopicItem';

interface SubscriptionData {
  subscriptionData: {
    data: TopicsIdsUpdatedSubscription;
  };
}

const Topics: FC = memo(() => {
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

  return (
    <TopicsStyled>
      {/* TODO: add loader */}
      {loading ? (
        'Loading topics ids...'
      ) : (
        <>
          {(data?.getTopicsIds || []).map((topicId) => (
            <Topic key={topicId} topicId={topicId} spaceId={spaceId} />
          ))}
          <AddTopic spaceId={spaceId} />
        </>
      )}
    </TopicsStyled>
  );
});
Topics.displayName = 'Topics';
Topics.whyDidYouRender = true;

export default Topics;
