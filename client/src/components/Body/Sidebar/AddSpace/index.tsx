import { GetSpacesSpaceFragment, useAddSpaceMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

import { AddSpaceStyled } from './styles';

interface AddSpaceProps {
  onAddSpace: (space: GetSpacesSpaceFragment) => void;
}

const AddSpace: FC<AddSpaceProps> = memo(({ onAddSpace }) => {
  const [addSpace, { loading }] = useAddSpaceMutation({
    variables: {
      title: 'New Space',
    },
  });

  const handleAddSpaceClick = useCallback(() => {
    addSpace().then((res) => {
      if (!loading && res.data?.addSpace) {
        onAddSpace(res.data?.addSpace);
      }
    });
  }, [addSpace, loading, onAddSpace]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <AddSpaceStyled onClick={handleAddSpaceClick}>Add Space</AddSpaceStyled>
  );
});

AddSpace.displayName = 'AddSpace';
AddSpace.whyDidYouRender = true;

export default AddSpace;
