import { useAddSpaceMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';
import Loading from 'src/components/common/Loading';

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

  return loading ? <Loading /> : <button onClick={handleAddSpaceClick}>Add Space</button>;
});

AddSpace.displayName = 'AddSpace';
AddSpace.whyDidYouRender = true;

export default AddSpace;
