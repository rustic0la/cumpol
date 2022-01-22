import { useAddTodoMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';

interface AddTodoProps {
  checkListId: string;
}

const AddTodo: FC<AddTodoProps> = ({ checkListId }) => {
  const [addTodo, { loading }] = useAddTodoMutation({
    variables: { checkListId, title: 'New Todo' },
  });

  const handleAddTodo = useCallback(() => {
    addTodo();
  }, [addTodo]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <button onClick={handleAddTodo}>Add Todo</button>
  );
};

export default AddTodo;
