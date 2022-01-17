import {
  TodoListsUpdatedDocument,
  TodoListsUpdatedSubscription,
  useGetTodoListsLazyQuery,
} from '@gql/types';
import React, { FC, memo, RefObject, useEffect, useRef } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import AddTodoList from './AddTodoList';
import { TodoListsStyled } from './styles';
import TodoList from './TodoList';

interface TodoListsProps {
  topicId: string;
}

interface SubscriptionData {
  subscriptionData: {
    data: TodoListsUpdatedSubscription;
  };
}

const TodoLists: FC<TodoListsProps> = memo(({ topicId }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  const [getTodoLists, { data, subscribeToMore }] = useGetTodoListsLazyQuery({
    variables: { topicId },
  });

  useEffect(() => {
    if (isVisible && !data) {
      getTodoLists();
    }
  }, [getTodoLists, isVisible, data]);

  useEffect(
    () =>
      subscribeToMore({
        document: TodoListsUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          const newData = subscriptionData.data;
          if (!newData) return prev;
          const { todoListsUpdated } = newData;

          if (todoListsUpdated[0].topicId === topicId) {
            return {
              getTodoLists: todoListsUpdated,
            };
          }
          return {
            getTodoLists: prev.getTodoLists,
          };
        },
      }),
    [subscribeToMore, topicId],
  );

  return (
    <TodoListsStyled ref={ref}>
      {(data?.getTodoLists || []).map((todoList) => (
        <TodoList key={todoList.id} todoList={todoList} topicId={topicId} />
      ))}
      <AddTodoList topicId={topicId} />
    </TodoListsStyled>
  );
});

TodoLists.displayName = 'TodoLists';
TodoLists.whyDidYouRender = true;

export default TodoLists;
