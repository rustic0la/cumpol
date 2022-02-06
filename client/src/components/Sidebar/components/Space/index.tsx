import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { SpaceFragment } from '@gql/types';
import React, { FC, memo, useState } from 'react';

import { useSpaceHandlers } from '../../hooks/useSpaceHandlers';
import EditPopover from './EditPopover';

interface SpaceProps {
  space: SpaceFragment;
  onDelete: (id: string) => void;
  isCurrent: boolean;
  onSelect: (id: string) => void;
}

const Space: FC<SpaceProps> = memo(({ space, onDelete, isCurrent, onSelect }) => {
  const { id, loadingDelete, handleDeleteClick } = useSpaceHandlers({
    space,
    onDelete,
  });

  const [inputValue, setInputValue] = useState(() => space.title);

  return (
    <Box
      bg={isCurrent ? 'gray.300' : 'white'}
      p="10px 15px"
      cursor="pointer"
      borderRadius="xl"
      _hover={{ bg: isCurrent ? '' : 'gray.100' }}
      onClick={() => onSelect(id)}
    >
      <Flex gap={3} align="center" justify="space-between">
        <Box color={isCurrent ? 'red' : 'black'} fontSize="13px">
          {inputValue}
        </Box>
        <Flex gap={2}>
          <EditPopover space={space} value={inputValue} setInputValue={setInputValue} />
          {loadingDelete ? (
            <Spinner size="sm" />
          ) : (
            <DeleteIcon
              onClick={(e) => handleDeleteClick(e)}
              color="gray.400"
              _hover={{ color: 'gray.600' }}
              cursor="pointer"
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
