import { TodoFragment, useDeleteTodoMutation, useUpdateTodoMutation } from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { TodoStyled } from './styles';

interface TodoProps {
  todo: TodoFragment;
  todoListId: string;
}

const Todo: FC<TodoProps> = memo(({ todo, todoListId }) => {
  const { id, title } = todo;
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue, todoListId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTodo();
    }
  }, [inputValue, title, updateTodo]);

  const [deleteTodo] = useDeleteTodoMutation({ variables: { todoId: id, todoListId } });

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo();
  }, [deleteTodo]);

  return (
    <TodoStyled>
      <input type="text" onChange={handleChangeTodo} onBlur={saveChange} value={inputValue} />
      <button onClick={handleDeleteTodoClick}>-</button>
    </TodoStyled>
  );
});
Todo.displayName = 'Todo';
Todo.whyDidYouRender = true;

export default Todo;