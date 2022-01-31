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

  const [shouldRenderPortal, setShouldRenderPortal] = useState(false);
  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateSpace();
    }
    setShouldRenderPortal(false);
  }, [inputValue, title, updateSpace]);

  const handleClickEditSpace = (e: MouseEvent) => {
    e.stopPropagation();
    setShouldRenderPortal(true);
  };

  return (
    <ListItem
      bg={isCurrent ? 'gray.300' : 'white'}
      p="10px 15px"
      cursor="pointer"
      borderRadius="xl"
      _hover={{ bg: isCurrent ? '' : 'gray.100' }}
    >
      <Box onClick={() => onSelect(id)}>
        <Flex gap={3} align="center" justify="space-between">
          <Box color={isCurrent ? 'red' : 'black'}>{inputValue}</Box>
          <Flex gap={2}>
            <Popover initialFocusRef={initialFocusRef}>
              <PopoverTrigger>
                <EditIcon onClick={(e) => handleClickEditSpace(e)} _hover={{ color: 'red' }} />
              </PopoverTrigger>
              {shouldRenderPortal && (
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
              )}
            </Popover>

            {loadingDelete ? (
              <Spinner size="sm" />
            ) : (
              <DeleteIcon
                onClick={(e) => handleDeleteSpaceClick(e)}
                color="gray.400"
                _hover={{ color: 'gray.600' }}
                cursor="pointer"
              />
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
