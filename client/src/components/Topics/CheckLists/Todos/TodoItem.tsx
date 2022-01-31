import { Box } from '@chakra-ui/react';
import { useDeleteTodoMutation, useGetTodoByIdQuery, useUpdateTodoMutation } from '@gql/types';
import React, {
  ChangeEvent,
  FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Loading from 'src/components/common/Loading';
import useOnScreen from 'src/hooks/useOnScreen';
interface TodoWrapperProps {
  todoId: string;
  checkListId: string;
}

const TodoWrapper: FC<TodoWrapperProps> = memo((props) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  // prevent from dissappearing while scrolling
  const [isVisibleState, setIsVisibleState] = useState<boolean | undefined>();
  useEffect(() => {
    if (isVisible) {
      setIsVisibleState(isVisible);
    }
  }, [isVisible]);

  return <Box ref={ref}>{isVisibleState ? <TodoInner {...props} /> : null}</Box>;
});
TodoWrapper.displayName = 'TodoWrapper';
TodoWrapper.whyDidYouRender = true;

type TodoInnerProps = TodoWrapperProps;

const TodoInner: FC<TodoInnerProps> = memo(({ todoId, checkListId }) => {
  const { data, loading } = useGetTodoByIdQuery({
    variables: { todoId },
  });

  const todo = data?.getTodoById;
  const title = todo?.title || '';
  const id = todo?.id || '';
  const meta = todo?.meta;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleChangeTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo, { loading: updateLoading }] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue, checkListId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateTodo();
    }
  }, [inputValue, title, updateTodo]);

  const [deleteTodo] = useDeleteTodoMutation({ variables: { todoId: id, checkListId } });

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo();
  }, [deleteTodo]);

  return loading || !id ? (
    <Loading />
  ) : (
    <>
      <div>
        {updateLoading && <p>Loading...</p>}
        {/* remove to meta component */}
        {meta ? (
          <>
            {meta?.hostname} {`${meta?.description?.slice(0, 30)}...`} {meta?.title}
            {meta?.img && <img src={meta?.img} />}
            {meta?.favicon && <img src={meta?.favicon} />}
          </>
        ) : (
          <input type="text" onChange={handleChangeTodo} onBlur={saveChange} value={inputValue} />
        )}
      </div>
      <button onClick={handleDeleteTodoClick}>-</button>
    </>
  );
});
TodoInner.displayName = 'TodoInner';
TodoInner.whyDidYouRender = true;

export default TodoWrapper;
