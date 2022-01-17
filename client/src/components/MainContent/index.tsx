import { TopicsUpdatedDocument, TopicsUpdatedSubscription, useGetTopicsQuery } from '@gql/types';
import React, { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AddTopic from './AddTopic';
import { MainContentStyled } from './styles';
import Topic from './Topic';

interface SubscriptionData {
  subscriptionData: {
    data: TopicsUpdatedSubscription;
  };
}

const MainContent: FC = memo(() => {
  const { spaceId = '' } = useParams();

  const { data, loading, subscribeToMore } = useGetTopicsQuery({
    variables: { spaceId },
    skip: !spaceId,
  });

  useEffect(
    () =>
      subscribeToMore({
        document: TopicsUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          const newData = subscriptionData.data;
          if (!newData) return prev;
          const { topicsUpdated } = newData;

          return {
            getTopics: topicsUpdated,
          };
        },
      }),
    [subscribeToMore],
  );

  return (
    <MainContentStyled>
      {/* TODO: add loader */}
      {loading ? (
        'Loading...'
      ) : (
        <>
          {(data?.getTopics || []).map((topic) => (
            <Topic key={topic.id} topic={topic} spaceId={spaceId} />
          ))}
          <AddTopic spaceId={spaceId} />
        </>
      )}
    </MainContentStyled>
  );
});
MainContent.displayName = 'MainContent';
MainContent.whyDidYouRender = true;

export default MainContent;
