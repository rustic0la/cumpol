import { CollectionFragment, useAddCollectionMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

interface AddCollectionButtonProps {
  domainId: string;
  onAddCollection: (collection: CollectionFragment) => void;
}

const AddCollection: FC<AddCollectionButtonProps> = memo(({ domainId, onAddCollection }) => {
  const [addCollection, { loading }] = useAddCollectionMutation({
    variables: {
      domainId,
      title: 'New Collection',
    },
  });

  const handleAddCollectionClick = useCallback(() => {
    addCollection().then((res) => {
      if (!loading && res.data?.addCollection) {
        onAddCollection(res.data?.addCollection);
      }
    });
  }, [addCollection, loading, onAddCollection]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <button onClick={handleAddCollectionClick}>Add Collection</button>
  );
});
AddCollection.displayName = 'AddCollectionButton';
AddCollection.whyDidYouRender = true;

export default AddCollection;
