import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useAddSpaceMutation } from '@gql/types';
import dayjs from 'dayjs';
import React, { FC, memo, useCallback } from 'react';

const AddSpace: FC = memo(() => {
  const [addSpace, { loading }] = useAddSpaceMutation({
    variables: {
      title: dayjs().format('ddd, MMM D, YYYY h:mm A'),
    },
  });

  const handleAddSpaceClick = useCallback(() => {
    addSpace();
  }, [addSpace]);

  return (
    <Button leftIcon={<AddIcon />} isLoading={loading} onClick={handleAddSpaceClick} w="100%">
      Add Space
    </Button>
  );
});

AddSpace.displayName = 'AddSpace';
AddSpace.whyDidYouRender = true;

export default AddSpace;
