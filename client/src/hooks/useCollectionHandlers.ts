import { GetSpacesSpaceFragment, TodoFragment, TodoListFragment, TopicFragment } from '@gql/types';
import { Dispatch, SetStateAction, useCallback } from 'react';

type HendlerEntity = GetSpacesSpaceFragment | TopicFragment | TodoListFragment | TodoFragment;

type GetSpacesSpace = Omit<GetSpacesSpaceFragment, '__typename'>;
type Topic = Omit<TopicFragment, '__typename'>;
type TodoList = Omit<TopicFragment, '__typename'>;
type Todo = Omit<TodoFragment, '__typename'>;

type SetStateActionArg = GetSpacesSpace & Topic & TodoList & Todo;

interface Options {
  setState: Dispatch<SetStateAction<SetStateActionArg[]>>;
}

interface ReturnType {
  handleDelete: (id: string) => void;
  handleUpdate: (entity: HendlerEntity | undefined) => void;
  handleAdd: (addedEntity: HendlerEntity) => void;
}

const useCollectionHandlers = ({ setState }: Options): ReturnType => {
  const handleDelete = useCallback(
    (id: string) => {
      setState((prev) => prev.filter((entity) => entity.id !== id));
    },
    [setState],
  );

  const handleUpdate = useCallback(
    (entity) => {
      if (entity) {
        setState((prev) => prev.map((e) => (e.id === entity.id ? entity : e)));
      }
    },
    [setState],
  );

  const handleAdd = useCallback(
    (addedEntity) => {
      setState((prev) => [...prev, addedEntity]);
    },
    [setState],
  );
  return { handleDelete, handleUpdate, handleAdd };
};

export default useCollectionHandlers;
