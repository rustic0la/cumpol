import { useDeleteTopicMutation, useGetTopicByIdQuery, useUpdateTopicMutation } from '@gql/types';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface UseTopicHandlersOptions {
  spaceId: string;
  topicId: string;
}
export const useTopicHandlers = ({ spaceId, topicId }: UseTopicHandlersOptions) => {
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

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTopic] = useUpdateTopicMutation({
    variables: { topicId: id, title: inputValue, spaceId },
  });

  const applyChange = useCallback(() => {
    if (!inputValue.trim()) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateTopic();
    }
  }, [inputValue, title, updateTopic]);

  const [deleteTopic, { loading: deleteLoading }] = useDeleteTopicMutation({
    variables: { topicId: id, spaceId },
  });

  const handleDeleteClick = useCallback(() => {
    deleteTopic();
  }, [deleteTopic]);

  const inputRef = useRef();
  const handleSelect = () => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.select();
    }
  };

  return {
    loading,
    checkListsIds,
    inputValue,
    id,
    handleChange,
    applyChange,
    deleteLoading,
    inputRef,
    handleDeleteClick,
    handleSelect,
  };
};
