import { TopicsUpdatedDocument, TopicsUpdatedSubscription, useGetTopicsQuery } from '@gql/types';
import React, { FC, memo, useEffect } from 'react';

import AddTopic from './AddTopic';
import { MainContentStyled } from './styles';
import Topic from './Topic';

const MainContent: FC = memo(() => {
  // TODO: get from useParams
  const spaceId = 'ckxv0r33d0034n8sz9oluhfdg';

  const { data, loading, subscribeToMore } = useGetTopicsQuery({ variables: { spaceId } });

  useEffect(
    () =>
      subscribeToMore({
        document: TopicsUpdatedDocument,
        updateQuery: (prev, { subscriptionData }) => {
          const newData = subscriptionData.data as unknown as TopicsUpdatedSubscription;
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
