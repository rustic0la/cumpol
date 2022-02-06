import { Box, List } from '@chakra-ui/react';
import { TodoFragment } from '@gql/types';
import React, { FC, memo } from 'react';

import Todo from './components/Todo';
import { useTodosHandlers } from './hooks/useTodosHandlers';

interface TodosProps {
  checkListId: string;
  todos: TodoFragment[];
}

const Todos: FC<TodosProps> = memo(({ checkListId, todos }) => {
  const { todosState } = useTodosHandlers({ checkListId, todos });

  return (
    <Box overflow="auto" w="100%">
      <List>
        {todosState.map((todo) => (
          <Todo key={todo.id} checkListId={checkListId} {...todo} />
        ))}
      </List>
    </Box>
  );
});

Todos.displayName = 'Todos';
Todos.whyDidYouRender = true;

export default Todos;
