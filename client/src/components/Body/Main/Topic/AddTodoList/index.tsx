import { useAddTodoListMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';

interface AddTodoListProps {
  topicId: string;
}

const AddTodoList: FC<AddTodoListProps> = ({ topicId }) => {
  const [addTodoList, { loading }] = useAddTodoListMutation({
    variables: { topicId, title: 'New TodoList' },
  });

  const handleAddTodoList = useCallback(() => {
    addTodoList();
  }, [addTodoList]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <button onClick={handleAddTodoList}>Add Todo List</button>
  );
};

export default AddTodoList;
