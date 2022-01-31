import { useAddTodoMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';
import Loading from 'src/components/common/Loading';

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

  return loading ? <Loading h="auto" /> : <button onClick={handleAddTodo}>Add Todo</button>;
};

export default AddTodo;
