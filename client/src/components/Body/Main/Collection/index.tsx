import {
  CollectionFragment,
  TodoListFragment,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from '@gql/types';
import React, { BaseSyntheticEvent, memo, useCallback, useState } from 'react';
import { FC } from 'react';

import AddTodoList from './AddTodoList';
import { Border, CollectionInnerStyled, CollectionStyled } from './styles';
import TodoList from './TodoList';

interface CollectionProps {
  collection: CollectionFragment;
  onUpdateCollection: (collection?: CollectionFragment) => void;
  onDeleteCollection: (id: string) => void;
}

const Collection: FC<CollectionProps> = memo(
  ({ collection, onDeleteCollection, onUpdateCollection }) => {
    const { id, title, todoLists } = collection;
    const [inputValue, setInputValue] = useState(() => title);

    const [deleteCollection] = useDeleteCollectionMutation();

    const handleDeleteCollectionClick = useCallback(
      (e: BaseSyntheticEvent) => {
        const collectionId = e.target.id;
        deleteCollection({ variables: { collectionId } }).then(() =>
          onDeleteCollection(collectionId),
        );
      },
      [deleteCollection, onDeleteCollection],
    );

    const handleChangeCollection = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    }, []);

    const [updateCollection] = useUpdateCollectionMutation({
      variables: { collectionId: id, title: inputValue },
    });

    const saveChange = useCallback(() => {
      if (!inputValue) {
        setInputValue(title);
      } else {
        updateCollection().then((res) => onUpdateCollection(res.data?.updateCollection));
      }
    }, [inputValue, onUpdateCollection, title, updateCollection]);

    return (
      <CollectionStyled>
        {/* TODO: add styles */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            onChange={handleChangeCollection}
            onBlur={saveChange}
            value={inputValue}
          />
          <button id={id} onClick={handleDeleteCollectionClick}>
            -
          </button>
        </div>
        <Border />
        <CollectionInner collectionId={id} todoLists={todoLists} />
      </CollectionStyled>
    );
  },
);
Collection.displayName = 'Collection';
Collection.whyDidYouRender = true;

interface CollectionInnerProps {
  collectionId: string;
  todoLists: TodoListFragment[];
}

const CollectionInner: FC<CollectionInnerProps> = memo(({ collectionId, todoLists }) => {
  const [todoListsState, setTodoListsState] = useState(() => todoLists);

  const handleUpdateTodoList = useCallback((todoList?: TodoListFragment) => {
    if (todoList) {
      setTodoListsState((prev) =>
        prev.map((tdLst) => (tdLst.id === todoList.id ? todoList : tdLst)),
      );
    }
  }, []);

  const handleDeleteTodoList = useCallback((todoListId: string) => {
    setTodoListsState((prev) => prev.filter((todoList) => todoList.id !== todoListId));
  }, []);

  const handleAddTodoList = useCallback((todoList: TodoListFragment) => {
    setTodoListsState((prev) => [...prev, todoList]);
  }, []);

  return (
    <CollectionInnerStyled>
      {todoListsState.map((todoList) => (
        <TodoList
          key={todoList?.id}
          todoList={todoList}
          onUpdateTodoList={handleUpdateTodoList}
          onDeleteTodoList={handleDeleteTodoList}
        />
      ))}
      <AddTodoList collectionId={collectionId} onAddTodoList={handleAddTodoList} />
    </CollectionInnerStyled>
  );
});
CollectionInner.displayName = 'CollectionInner';
CollectionInner.whyDidYouRender = true;

export default Collection;
