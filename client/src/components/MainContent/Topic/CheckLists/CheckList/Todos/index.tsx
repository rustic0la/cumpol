import { TodosUpdatedDocument, TodosUpdatedSubscription, useGetTodosLazyQuery } from '@gql/types';
import React, { FC, memo, RefObject, useEffect, useRef } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import AddTodo from './AddTodo';
import Todo from './Todo';

interface TodosProps {
  checkListId: string;
}

interface SubscriptionData {
  subscriptionData: {
    data: TodosUpdatedSubscription;
  };
}

const Todos: FC<TodosProps> = memo(({ checkListId }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  const [getTodos, { data, subscribeToMore }] = useGetTodosLazyQuery({
    variables: { checkListId },
  });

  useEffect(() => {
    if (isVisible && !data) {
      getTodos();
    }
  }, [getTodos, isVisible, data]);

  useEffect(
    () =>
      subscribeToMore({
        document: TodosUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          const newData = subscriptionData.data;
          if (!newData) return prev;
          const { todosUpdated } = newData;

          if (todosUpdated[0].checkListId === checkListId) {
            return {
              getTodos: todosUpdated,
            };
          }
          return {
            getTodos: prev.getTodos,
          };
        },
      }),
    [subscribeToMore, checkListId],
  );

  return (
    <div ref={ref}>
      {(data?.getTodos || []).map((todo) => (
        <Todo key={todo.id} todo={todo} checkListId={checkListId} />
      ))}
      <AddTodo checkListId={checkListId} />
    </div>
  );
});
Todos.displayName = 'Todos';
Todos.whyDidYouRender = true;

export default Todos;
