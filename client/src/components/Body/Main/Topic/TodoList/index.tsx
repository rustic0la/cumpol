import {
  TodoListFragment,
  useDeleteTodoListMutation,
  useGetTodosLazyQuery,
  useUpdateTodoListMutation,
} from '@gql/types';
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
import useOnScreen from 'src/hooks/useOnScreen';

import AddTodo from './AddTodo';
import { TodoListStyled } from './styles';
import Todo from './Todo';

interface TodoListProps {
  todoList: TodoListFragment;
  topicId: string;
}

const TodoList: FC<TodoListProps> = memo(({ todoList, topicId }) => {
  const { id, title } = todoList;
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodoList = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodoList] = useUpdateTodoListMutation({
    variables: { todoListId: id, title: inputValue, topicId },
  });

  const applyChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTodoList();
    }
  }, [inputValue, title, updateTodoList]);

  const [deleteTodoList] = useDeleteTodoListMutation({ variables: { todoListId: id, topicId } });

  const handleDeleteTodoListClick = useCallback(() => {
    deleteTodoList();
  }, [deleteTodoList]);

  return (
    <TodoListStyled>
      <input type="text" onChange={handleChangeTodoList} onBlur={applyChange} value={inputValue} />
      <button onClick={handleDeleteTodoListClick}>-</button>
      <TodoListInner todoListId={id} />
    </TodoListStyled>
  );
});
TodoList.displayName = 'TodoList';

interface TodoListInnerProps {
  todoListId: string;
}

const TodoListInner: FC<TodoListInnerProps> = memo(({ todoListId }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  const [getTodos, { data, subscribeToMore }] = useGetTodosLazyQuery({
    variables: { todoListId },
  });

  useEffect(() => {
    if (isVisible && !data) {
      getTodos();
    }
  }, [getTodos, isVisible, data]);

  return (
    <div ref={ref}>
      {(data?.getTodos || []).map((todo) => (
        <Todo key={todo.id} todo={todo} todoListId={todoListId} />
      ))}
      <AddTodo todoListId={todoListId} />
    </div>
  );
});
TodoListInner.displayName = 'TodoListInner';
TodoListInner.whyDidYouRender = true;

export default TodoList;
