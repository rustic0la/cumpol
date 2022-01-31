import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, Spinner } from '@chakra-ui/react';
import { useDeleteTopicMutation, useGetTopicByIdQuery, useUpdateTopicMutation } from '@gql/types';
import React, { memo, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { ChangeEvent, FC } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import Loading from '../common/Loading';
import CheckLists from './CheckLists';
import AddCheckList from './CheckLists/AddCheckList';
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

  return <Box ref={ref}>{isVisibleState && <TopicInner {...props} />}</Box>;
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
      setInputValue(title);
    } else {
      if (inputValue !== title) updateTopic();
    }
  }, [inputValue, title, updateTopic]);

  const [deleteTopic, { loading: deleteLoading }] = useDeleteTopicMutation({
    variables: { topicId: id, spaceId },
  });

  const handleDeleteTopicClick = useCallback(() => {
    deleteTopic();
  }, [deleteTopic]);

  return (
    <>
      <Flex align="center" justify="space-between" mr={3}>
        <Input
          variant="flushed"
          onChange={handleChangeTopic}
          onBlur={saveChange}
          value={inputValue}
        />
        {deleteLoading ? (
          <Spinner size="sm" />
        ) : (
          <DeleteIcon
            onClick={handleDeleteTopicClick}
            color="gray.400"
            _hover={{ color: 'gray.600' }}
            cursor="pointer"
          />
        )}
      </Flex>
      <Box display="-webkit-box" overflowX="scroll" m="10px">
        {loading || !id ? (
          <Loading w={80} h={400} />
        ) : (
          <CheckLists topicId={id} checkListsIds={checkListsIds} />
        )}
        <AddCheckList topicId={topicId} />
      </Box>
    </>
  );
});
TopicInner.displayName = 'TopicInner';
TopicInner.whyDidYouRender = true;

export default TopicWrapper;
