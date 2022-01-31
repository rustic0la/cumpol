import { Box, Flex, ListItem } from '@chakra-ui/react';
import { SpaceFragment, useDeleteSpaceMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface SpaceProps {
  space: SpaceFragment;
  onDelete: (id: string) => void;
  isCurrent: boolean;
}

const Space: FC<SpaceProps> = memo(({ space, onDelete, isCurrent }) => {
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
    // TODO: fix style
    <ListItem bg={isCurrent ? 'gray.300' : 'white'} p="5px 10px" mb={5} cursor="pointer">
      <Flex gap={3}>
        <Box
          color={isCurrent ? 'red' : 'black'}
          // onChange={handleChangeSpace}
          // onBlur={saveChange}
          // value={inputValue}
        >
          {isCurrent ? <>{title}</> : <Link to={`/${id}`}>{title}</Link>}
        </Box>
        <button onClick={handleDeleteSpaceClick}>-</button>
      </Flex>
    </ListItem>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
