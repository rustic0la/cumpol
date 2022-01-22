import { TopicFragment, useDeleteTopicMutation, useUpdateTopicMutation } from '@gql/types';
import React, { memo, useCallback, useState } from 'react';
import { ChangeEvent, FC } from 'react';

import { Border, TopicStyled } from './styles';
import CheckLists from './CheckLists';

interface TopicProps {
  topic: TopicFragment;
  spaceId: string;
}

const Topic: FC<TopicProps> = memo(({ topic, spaceId }) => {
  const { id, title } = topic;
  const [inputValue, setInputValue] = useState(() => title);

  const [deleteTopic] = useDeleteTopicMutation({ variables: { topicId: id, spaceId } });

  const handleDeleteTopicClick = useCallback(() => {
    deleteTopic();
  }, [deleteTopic]);

  const handleChangeTopic = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTopic] = useUpdateTopicMutation({
    variables: { topicId: id, title: inputValue, spaceId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTopic();
    }
  }, [inputValue, title, updateTopic]);

  return (
    <TopicStyled>
      {/* TODO: add styles */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input type="text" onChange={handleChangeTopic} onBlur={saveChange} value={inputValue} />
        <button onClick={handleDeleteTopicClick}>-</button>
      </div>
      <Border />
      <CheckLists topicId={id} />
    </TopicStyled>
  );
});

Topic.displayName = 'Topic';
Topic.whyDidYouRender = true;

export default Topic;
