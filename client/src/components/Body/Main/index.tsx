import { TopicFragment, useGetTopicsQuery } from '@gql/types';
import React, { FC, memo, useCallback, useState } from 'react';

import AddTopic from './AddTopic';
import { MainContentStyled } from './styles';
import Topic from './Topic';

const MainContent: FC = memo(() => {
  // TODO: get from useParams
  const spaceId = 'ckxv0r33d0034n8sz9oluhfdg';

  const { data, loading } = useGetTopicsQuery({ variables: { spaceId } });

  return (
    <MainContentStyled>
      {/* TODO: add loader */}
      {loading ? (
        'Loading...'
      ) : (
        <MainContentInner spaceId={spaceId} topics={data?.getTopics || []} />
      )}
    </MainContentStyled>
  );
});
MainContent.displayName = 'MainContent';
MainContent.whyDidYouRender = true;

interface MainContentInnerProps {
  spaceId: string;
  topics: TopicFragment[];
}

const MainContentInner: FC<MainContentInnerProps> = memo(({ spaceId, topics }) => {
  const [topicsState, setTopicsState] = useState(() => topics);

  const handleDeleteTopic = useCallback((id: string) => {
    setTopicsState((prev) => prev.filter((topic) => topic.id !== id));
  }, []);

  const handleUpdateTopic = useCallback((topic?: TopicFragment) => {
    if (topic) {
      setTopicsState((prev) => prev.map((c) => (c.id === topic.id ? topic : c)));
    }
  }, []);

  const handleAddTopic = useCallback((topic: TopicFragment) => {
    setTopicsState((prev) => [...prev, topic]);
  }, []);

  return (
    <>
      {topicsState.map((topic) => (
        <Topic
          key={topic.id}
          topic={topic}
          onDeleteTopic={handleDeleteTopic}
          onUpdateTopic={handleUpdateTopic}
        />
      ))}
      <AddTopic spaceId={spaceId} onAddTopic={handleAddTopic} />
    </>
  );
});
MainContentInner.displayName = 'MainContentInner';
MainContentInner.whyDidYouRender = true;

export default MainContent;
