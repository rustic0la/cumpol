import { useDeleteTopicMutation, useGetTopicByIdQuery, useUpdateTopicMutation } from '@gql/types';
import React, { memo, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { ChangeEvent, FC } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import CheckLists from './CheckLists';
import AddCheckList from './CheckLists/AddCheckList';
import { Border, TopicWrapperStyled } from './styles';

interface TopicWrapperProps {
  topicId: string;
  spaceId: string;
}

const TopicWrapper: FC<TopicWrapperProps> = memo((props) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  // prevent from dissappearing while scrolling
  const [isVisibleState, setIsVisibleState] = useState<boolean | undefined>();
  useEffect(() => {
    if (isVisible) {
      setIsVisibleState(isVisible);
    }
  }, [isVisible]);

  return (
    <TopicWrapperStyled ref={ref}>{isVisibleState && <TopicInner {...props} />}</TopicWrapperStyled>
  );
});
TopicWrapper.displayName = 'TopicWrapper';
TopicWrapper.whyDidYouRender = true;

type TopicInnerProps = TopicWrapperProps;

const TopicInner: FC<TopicInnerProps> = memo(({ spaceId, topicId }) => {
  const { data, loading } = useGetTopicByIdQuery({
    variables: { topicId },
  });

  const topic = data?.getTopicById;
  const title = topic?.title || '';
  const id = topic?.id || '';
  const checkListsIds = topic?.checkListsIds || [];

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleChangeTopic = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTopic] = useUpdateTopicMutation({
    variables: { topicId: id, title: inputValue, spaceId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(id);
    } else {
      if (inputValue !== id) updateTopic();
    }
  }, [inputValue, id, updateTopic]);

  const [deleteTopic] = useDeleteTopicMutation({ variables: { topicId: id, spaceId } });

  const handleDeleteTopicClick = useCallback(() => {
    deleteTopic();
  }, [deleteTopic]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input type="text" onChange={handleChangeTopic} onBlur={saveChange} value={inputValue} />
        <button onClick={handleDeleteTopicClick}>-</button>
      </div>
      <Border />
      <div style={{ display: '-webkit-box', overflowX: 'scroll', margin: '10px' }}>
        {loading || !id ? (
          'Loading topic by id'
        ) : (
          <CheckLists topicId={id} checkListsIds={checkListsIds} />
        )}
        <AddCheckList topicId={topicId} />
      </div>
    </>
  );
});
TopicInner.displayName = 'TopicInner';
TopicInner.whyDidYouRender = true;

export default TopicWrapper;
