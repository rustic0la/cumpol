import { TodoFragment, useDeleteTodoMutation, useUpdateTodoMutation } from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { TodoStyled } from './styles';

interface TodoProps {
  todo: TodoFragment;
  checkListId: string;
}

const Todo: FC<TodoProps> = memo(({ todo, checkListId }) => {
  const { id, title, meta } = todo;
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo, { loading }] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue, checkListId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateTodo().then((res) => console.log('res', res));
    }
  }, [inputValue, title, updateTodo]);

  const [deleteTodo] = useDeleteTodoMutation({ variables: { todoId: id, checkListId } });

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo();
  }, [deleteTodo]);

  return (
    <TodoStyled>
      <div>
        {loading && <p>Loading...</p>}
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
    </TodoStyled>
  );
});
Todo.displayName = 'Todo';
Todo.whyDidYouRender = true;

export default Todo;
