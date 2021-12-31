import { TodoFragment, useAddTodoMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';

interface AddTodoProps {
  todoListId: string;
  onAddTodo: (todo: TodoFragment) => void;
}

const AddTodo: FC<AddTodoProps> = ({ todoListId, onAddTodo }) => {
  const [addTodo, { loading }] = useAddTodoMutation({
    variables: { todoListId, title: 'New Todo' },
  });

  const handleAddTodo = useCallback(() => {
    addTodo().then((res) => {
      if (!loading && res.data?.addTodo) {
        onAddTodo(res.data?.addTodo);
      }
    });
  }, [addTodo, loading, onAddTodo]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <button onClick={handleAddTodo}>Add Todo</button>
  );
};

export default AddTodo;
