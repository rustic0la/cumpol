import { TodoListFragment, useAddTodoListMutation } from '@gql/types';
import React, { useCallback } from 'react';
import { FC } from 'react';

interface AddTodoListProps {
  topicId: string;
  onAddTodoList: (todoList: TodoListFragment) => void;
}

const AddTodoList: FC<AddTodoListProps> = ({ topicId, onAddTodoList }) => {
  const [addTodoList, { loading }] = useAddTodoListMutation({
    variables: { topicId, title: 'New TodoList' },
  });

  const handleAddTodoList = useCallback(() => {
    addTodoList().then((res) => {
      if (!loading && res.data?.addTodoList) {
        onAddTodoList(res.data?.addTodoList);
      }
    });
  }, [addTodoList, loading, onAddTodoList]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <button onClick={handleAddTodoList}>Add Todo List</button>
  );
};

export default AddTodoList;
