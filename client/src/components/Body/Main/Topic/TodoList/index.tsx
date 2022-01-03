import {
  TodoFragment,
  TodoListFragment,
  useDeleteTodoListMutation,
  useUpdateTodoListMutation,
} from '@gql/types';
import React, { FC, memo, useCallback, useState } from 'react';

import AddTodo from './AddTodo';
import { TodoListStyled } from './styles';
import Todo from './Todo';

interface TodoListProps {
  todoList: TodoListFragment;
  topicId: string;
}
const TodoList: FC<TodoListProps> = memo(({ todoList, topicId }) => {
  const { id, title, todos } = todoList;

  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodoList = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
      <TodoListInner todoListId={id} todos={todos} />
    </TodoListStyled>
  );
});
TodoList.displayName = 'TodoList';

interface TodoListInnerProps {
  todos: TodoFragment[];
  todoListId: string;
}

const TodoListInner: FC<TodoListInnerProps> = memo(({ todos, todoListId }) => {
  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} todoListId={todoListId} />
      ))}
      <AddTodo todoListId={todoListId} />
    </>
  );
});
TodoListInner.displayName = 'TodoListInner';

export default TodoList;
