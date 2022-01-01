import { TopicFragment, useGetTopicsQuery } from '@gql/types';
import React, { FC, memo, useState } from 'react';
import useCollectionHandlers from 'src/hooks/useCollectionHandlers';

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

  const { handleUpdate, handleDelete, handleAdd } = useCollectionHandlers({
    setState: setTopicsState,
  });

  return (
    <>
      {topicsState.map((topic) => (
        <Topic
          key={topic.id}
          topic={topic}
          onDeleteTopic={handleDelete}
          onUpdateTopic={handleUpdate}
        />
      ))}
      <AddTopic spaceId={spaceId} onAddTopic={handleAdd} />
    </>
  );
});
MainContentInner.displayName = 'MainContentInner';
MainContentInner.whyDidYouRender = true;

export default MainContent;
