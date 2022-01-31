import { useSubscription } from '@apollo/client';
import { TodosIdsUpdatedDocument, TodosIdsUpdatedSubscription } from '@gql/types';
import React, { FC, memo, useEffect, useState } from 'react';

import Todo from './TodoItem';

interface TodosProps {
  checkListId: string;
  todosIds: string[];
}

const Todos: FC<TodosProps> = memo(({ checkListId, todosIds }) => {
  const [ids, setIds] = useState<string[]>(() => todosIds);

  const { data, loading }: { data?: TodosIdsUpdatedSubscription; loading: boolean } =
    useSubscription(TodosIdsUpdatedDocument, {
      variables: { checkListId },
    });

  useEffect(() => {
    if (!loading && data?.todosIdsUpdated.checkListId === checkListId) {
      setIds(data?.todosIdsUpdated.todosIds || []);
    }
  }, [checkListId, data?.todosIdsUpdated.checkListId, data?.todosIdsUpdated.todosIds, loading]);

  return (
    <>
      {ids.map((todoId) => (
        <Todo key={todoId} checkListId={checkListId} todoId={todoId} />
      ))}
    </>
  );
});
Todos.displayName = 'Todos';
Todos.whyDidYouRender = true;

export default Todos;
