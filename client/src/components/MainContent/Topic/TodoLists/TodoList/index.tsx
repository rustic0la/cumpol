import { TodoListFragment, useDeleteTodoListMutation, useUpdateTodoListMutation } from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { TodoListStyled } from './styles';
import Todos from './Todos';

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
      <Todos todoListId={id} />
    </TodoListStyled>
  );
});
TodoList.displayName = 'TodoList';

export default TodoList;
