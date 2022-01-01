import {
  TodoFragment,
  TodoListFragment,
  useDeleteTodoListMutation,
  useUpdateTodoListMutation,
} from '@gql/types';
import React, { BaseSyntheticEvent, FC, memo, useCallback, useState } from 'react';
import useCollectionHandlers from 'src/hooks/useCollectionHandlers';

import AddTodo from './AddTodo';
import { TodoListStyled } from './styles';
import Todo from './Todo';

interface TodoListProps {
  todoList: TodoListFragment;
  onUpdateTodoList: (todoList?: TodoListFragment) => void;
  onDeleteTodoList: (todoListId: string) => void;
}
const TodoList: FC<TodoListProps> = memo(({ todoList, onUpdateTodoList, onDeleteTodoList }) => {
  const { id, title, todos } = todoList;
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodoList = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodoList] = useUpdateTodoListMutation({
    variables: { todoListId: id, title: inputValue },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateTodoList().then((res) => onUpdateTodoList(res.data?.updateTodoList));
    }
  }, [inputValue, onUpdateTodoList, title, updateTodoList]);

  const [deleteTodoList] = useDeleteTodoListMutation();

  const handleDeleteTodoListClick = useCallback(
    (e: BaseSyntheticEvent) => {
      const todoListId = e.target.id;
      deleteTodoList({ variables: { todoListId } }).then(() => onDeleteTodoList(todoListId));
    },
    [deleteTodoList, onDeleteTodoList],
  );

  return (
    <TodoListStyled>
      <input type="text" onChange={handleChangeTodoList} onBlur={saveChange} value={inputValue} />
      <button id={id} onClick={handleDeleteTodoListClick}>
        -
      </button>
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
  const [todosState, setTodosState] = useState(() => todos);

  const { handleUpdate, handleDelete, handleAdd } = useCollectionHandlers({
    // @ts-ignore
    setState: setTodosState,
  });

  return (
    <>
      {todosState.map((todo) => (
        <Todo key={todo.id} todo={todo} onUpdateTodo={handleUpdate} onDeleteTodo={handleDelete} />
      ))}
      <AddTodo todoListId={todoListId} onAddTodo={handleAdd} />
    </>
  );
});
TodoListInner.displayName = 'TodoListInner';

export default TodoList;
