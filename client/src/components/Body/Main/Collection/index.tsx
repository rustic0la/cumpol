import React, { BaseSyntheticEvent, memo, useCallback, useState } from 'react';
import { FC } from 'react';

import {
  CollectionFragment,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
} from '../../../../generated/types';
import { Border, CollectionStyled } from './styles';
import TodoList from './TodoList';

interface CollectionProps {
  collection: CollectionFragment;
  onUpdateCollection: (collection?: CollectionFragment) => void;
  onDeleteCollection: (id: string) => void;
}

const Collection: FC<CollectionProps> = memo(
  ({ collection, onDeleteCollection, onUpdateCollection }) => {
    const { id, title } = collection;
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

    const [updateCollection] = useUpdateCollectionMutation({
      variables: { collectionId: id, title: inputValue },
    });

    const handleChangeCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

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
        <TodoList />
      </CollectionStyled>
    );
  },
);
Collection.displayName = 'Collection';
Collection.whyDidYouRender = true;
export default Collection;
