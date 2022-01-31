import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Input,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spinner,
} from '@chakra-ui/react';
import { SpaceFragment, useDeleteSpaceMutation, useUpdateSpaceMutation } from '@gql/types';
import React, { ChangeEvent, FC, memo, MouseEvent, useCallback, useRef, useState } from 'react';

interface SpaceProps {
  space: SpaceFragment;
  onDelete: (id: string) => void;
  isCurrent: boolean;
  onSelect: (id: string) => void;
}

const Space: FC<SpaceProps> = memo(({ space, onDelete, isCurrent, onSelect }) => {
  const { id, title } = space;
  const [inputValue, setInputValue] = useState(() => title);

  const [updateSpace] = useUpdateSpaceMutation({
    variables: { spaceId: id, title: inputValue },
  });
  const [deleteSpace, { loading: loadingDelete }] = useDeleteSpaceMutation();

  const handleDeleteSpaceClick = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      deleteSpace({ variables: { spaceId: id } }).then(() => onDelete(id));
    },
    [deleteSpace, id, onDelete],
  );

  const initialFocusRef = useRef(null);

  const handleEditSpace = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setInputValue(e.target.value);
  }, []);

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateSpace();
    }
  }, [inputValue, title, updateSpace]);

  return (
    <ListItem bg={isCurrent ? 'gray.300' : 'white'} p="5px 10px" cursor="pointer">
      <Box onClick={() => onSelect(id)}>
        <Flex gap={3} align="center" justify="space-between">
          <Box color={isCurrent ? 'red' : 'black'}>{inputValue}</Box>
          <Flex gap={2}>
            <Popover initialFocusRef={initialFocusRef}>
              <PopoverTrigger>
                <EditIcon onClick={(e) => e.stopPropagation()} _hover={{ color: 'red' }} />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <Input
                      ref={initialFocusRef}
                      onChange={handleEditSpace}
                      onBlur={saveChange}
                      size="xs"
                      value={inputValue}
                    />
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>

            {loadingDelete ? (
              <Spinner size="sm" />
            ) : (
              <DeleteIcon onClick={(e) => handleDeleteSpaceClick(e)} _hover={{ color: 'red' }} />
            )}
          </Flex>
        </Flex>
      </Box>
    </ListItem>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
