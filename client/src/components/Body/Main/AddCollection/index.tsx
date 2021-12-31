import { CollectionFragment, useAddCollectionMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

// TODO: get from useParams
const domainID = 'ckxp0bztx154926szjy0hqjot';

interface AddCollectionButtonProps {
  onAddCollection: (collection: CollectionFragment) => void;
}

const AddCollectionButton: FC<AddCollectionButtonProps> = memo(({ onAddCollection }) => {
  const [addCollection, { loading }] = useAddCollectionMutation({
    variables: {
      domainId: domainID,
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
AddCollectionButton.displayName = 'AddCollectionButton';
AddCollectionButton.whyDidYouRender = true;

export default AddCollectionButton;
