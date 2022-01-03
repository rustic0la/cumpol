import { useAddSpaceMutation } from '@gql/types';
import React, { memo, useCallback } from 'react';

import { AddSpaceStyled } from './styles';

const AddSpace = memo(() => {
  const [addSpace, { loading }] = useAddSpaceMutation({
    variables: {
      title: 'New Space',
    },
  });

  const handleAddSpaceClick = useCallback(() => {
    addSpace();
  }, [addSpace]);

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
