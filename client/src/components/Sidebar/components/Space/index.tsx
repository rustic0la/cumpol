import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
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
  const { id, deleteLoading, handleDeleteClick } = useSpaceHandlers({
    space,
    onDelete,
  });

  const [inputValue, setInputValue] = useState(() => space.title);

  return (
    <Box
      bg={isCurrent ? '#70ccd6' : 'white'}
      p="10px 15px"
      cursor="pointer"
      borderRadius="xl"
      _hover={{ bg: isCurrent ? '' : 'gray.100' }}
      onClick={() => onSelect(id)}
    >
      <Flex gap={1} align="center" justify="space-between">
        <Box color="black" fontSize="13px">
          <Text
            fontSize="12px"
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            lineHeight="1.2"
            mt={1}
            mb={1}
            style={{
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {inputValue}
          </Text>
        </Box>
        <Flex gap={2}>
          <EditPopover space={space} value={inputValue} setInputValue={setInputValue} />
          {deleteLoading ? (
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
