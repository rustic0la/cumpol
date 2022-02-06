import {
  useDeleteCheckListMutation,
  useGetCheckListByIdQuery,
  useUpdateCheckListMutation,
} from '@gql/types';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface UseCheckListHandlersOptions {
  checkListId: string;
  topicId: string;
}

export const useCheckListHandlers = ({ checkListId, topicId }: UseCheckListHandlersOptions) => {
  const { data, loading } = useGetCheckListByIdQuery({
    variables: { checkListId },
  });

  const checkList = data?.getCheckListById;
  const title = checkList?.title || '';
  const id = checkList?.id || '';
  const todos = checkList?.todos || [];

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateCheckList] = useUpdateCheckListMutation({
    variables: { checkListId: id, title: inputValue, topicId },
  });

  const applyChange = useCallback(() => {
    if (!inputValue.trim()) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateCheckList();
    }
  }, [inputValue, title, updateCheckList]);

  const [deleteCheckList, { loading: deleteLoading }] = useDeleteCheckListMutation({
    variables: { checkListId: id, topicId },
  });

  const handleDeleteClick = useCallback(() => {
    deleteCheckList();
  }, [deleteCheckList]);

  const inputRef = useRef();
  const handleSelect = () => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.select();
    }
  };

  return {
    loading,
    id,
    handleChange,
    applyChange,
    inputValue,
    handleSelect,
    deleteLoading,
    handleDeleteClick,
    todos,
    inputRef,
  };
};
