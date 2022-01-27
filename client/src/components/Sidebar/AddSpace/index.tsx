import { useAddSpaceMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

import { AddSpaceStyled } from './styles';

// interface AddSpaceProps {
//   onAdd: () => void;
// }
const AddSpace: FC = memo(() => {
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
