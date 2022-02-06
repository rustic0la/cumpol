import { useSubscription } from '@apollo/client';
import { TodoFragment, TodosUpdatedDocument, TodosUpdatedSubscription } from '@gql/types';
import { useEffect, useState } from 'react';

interface UseTodosHandlersOptions {
  checkListId: string;
  todos: TodoFragment[];
}
export const useTodosHandlers = ({ checkListId, todos }: UseTodosHandlersOptions) => {
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

  return { todosState };
};
