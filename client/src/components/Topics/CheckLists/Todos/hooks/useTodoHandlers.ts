import {
  MetaFragment,
  TodoFragment,
  useAddMetaMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@gql/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import isValidURL from 'src/utils/isValidUrl';

interface UseTodoHandlersOptions extends TodoFragment {
  checkListId: string;
}

export const useTodoHandlers = ({
  checkListId,
  id,
  title,
  meta,
  isWatched,
}: UseTodoHandlersOptions) => {
  const [inputValue, setInputValue] = useState(() => title);
  const [isWatchedState, setIsWatched] = useState(() => isWatched);

  const handleChangeTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo, { loading: updateLoading }] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue, isWatched: isWatchedState, checkListId },
  });

  const [addMeta, { loading: addMetaLoading }] = useAddMetaMutation();

  const [metaState, setMetaState] = useState<Maybe<MetaFragment | undefined>>(() => meta);

  const handleToggleCheckbox = useCallback(() => {
    setIsWatched((prev) => !prev);
  }, []);

  const applyChange = useCallback(() => {
    if (!inputValue.trim()) {
      setInputValue(title);
    } else {
      if (isValidURL(inputValue)) {
        addMeta({ variables: { url: inputValue, todoId: id } }).then((res) =>
          setMetaState(res?.data?.addMeta),
        );
      }
      if (inputValue !== title) updateTodo();
    }
  }, [addMeta, id, inputValue, title, updateTodo]);

  const [deleteTodo, { loading: deleteLoading }] = useDeleteTodoMutation({
    variables: { todoId: id, checkListId },
    // delete from apollo cache
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: 'Todo' });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo();
  }, [deleteTodo]);

  const inputRef = useRef();
  const handleSelect = () => {
    if (inputRef && inputRef.current) {
      // @ts-ignore
      inputRef.current.select();
    }
  };

  return {
    isWatchedState,
    handleToggleCheckbox,
    updateLoading,
    addMetaLoading,
    metaState,
    handleSelect,
    handleChangeTodo,
    applyChange,
    inputValue,
    deleteLoading,
    handleDeleteTodoClick,
    inputRef,
  };
};
