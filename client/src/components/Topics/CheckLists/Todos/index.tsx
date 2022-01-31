import { useSubscription } from '@apollo/client';
import { Box, List } from '@chakra-ui/react';
import { TodoFragment, TodosUpdatedDocument, TodosUpdatedSubscription } from '@gql/types';
import React, { FC, memo, useEffect, useState } from 'react';

import Todo from './TodoItem';

interface TodosProps {
  checkListId: string;
  todos: TodoFragment[];
}

const Todos: FC<TodosProps> = memo(({ checkListId, todos }) => {
  const [todosState, setTodosState] = useState<TodoFragment[]>(() => todos);

  const { data, loading }: { data?: TodosUpdatedSubscription; loading: boolean } = useSubscription(
    TodosUpdatedDocument,
    {
      variables: { checkListId },
    },
  );

  useEffect(() => {
    if (!loading && data?.todosUpdated.checkListId === checkListId) {
      setTodosState(data?.todosUpdated.todos || []);
    }
  }, [checkListId, data?.todosUpdated.checkListId, data?.todosUpdated.todos, loading]);

  return (
    <Box overflow="auto">
      <List>
        {todosState.map((todo) => (
          <Todo key={todo.id} checkListId={checkListId} todo={todo} />
        ))}
      </List>
    </Box>
  );
});
Todos.displayName = 'Todos';
Todos.whyDidYouRender = true;

export default Todos;
