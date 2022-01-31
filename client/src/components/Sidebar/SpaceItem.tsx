import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, ListItem } from '@chakra-ui/react';
import { SpaceFragment, useDeleteSpaceMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface SpaceProps {
  space: SpaceFragment;
  onDelete: (id: string) => void;
  isCurrent: boolean;
  onSelect: (id: string) => void;
}

const Space: FC<SpaceProps> = memo(({ space, onDelete, isCurrent, onSelect }) => {
  const { id, title } = space;
  // const [inputValue, setInputValue] = useState(() => title);

  // const [updateSpace] = useUpdateSpaceMutation({
  //   variables: { spaceId: id, title: inputValue },
  // });
  const [deleteSpace] = useDeleteSpaceMutation();

  const handleDeleteSpaceClick = useCallback(() => {
    deleteSpace({ variables: { spaceId: id } }).then(() => onDelete(id));
  }, [deleteSpace, id, onDelete]);

  // const handleChangeSpace = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // }, []);

  // const saveChange = useCallback(() => {
  //   if (!inputValue) {
  //     setInputValue(title);
  //   } else {
  //     if (inputValue !== title) updateSpace();
  //   }
  // }, [inputValue, title, updateSpace]);

  return (
    <ListItem bg={isCurrent ? 'gray.300' : 'white'} p="5px 10px" cursor="pointer">
      <Box onClick={() => onSelect(id)}>
        <Flex gap={3} align="center">
          <Box
            color={isCurrent ? 'red' : 'black'}
            // onChange={handleChangeSpace}
            // onBlur={saveChange}
            // value={inputValue}
          >
            {title}
          </Box>
          <DeleteIcon onClick={handleDeleteSpaceClick} _hover={{ color: 'red' }} />
        </Flex>
      </Box>
    </ListItem>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
