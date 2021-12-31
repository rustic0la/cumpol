import { TodoFragment, useDeleteTodoMutation, useUpdateTodoMutation } from '@gql/types';
import React, { BaseSyntheticEvent, FC, useCallback, useState } from 'react';

import { TodoStyled } from './styles';

interface TodoProps {
  todo: TodoFragment;
  onUpdateTodo: (todo?: TodoFragment) => void;
  onDeleteTodo: (todoId: string) => void;
}

const Todo: FC<TodoProps> = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const { id, title } = todo;
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTodo().then((res) => onUpdateTodo(res.data?.updateTodo));
    }
  }, [inputValue, onUpdateTodo, title, updateTodo]);

  const [deleteTodo] = useDeleteTodoMutation();

  const handleDeleteTodoClick = useCallback(
    (e: BaseSyntheticEvent) => {
      const todoId = e.target.id;
      deleteTodo({ variables: { todoId } }).then(() => onDeleteTodo(todoId));
    },
    [deleteTodo, onDeleteTodo],
  );

  return (
    <TodoStyled>
      <input type="text" onChange={handleChangeTodo} onBlur={saveChange} value={inputValue} />
      <button id={id} onClick={handleDeleteTodoClick}>
        -
      </button>
    </TodoStyled>
  );
};

export default Todo;
