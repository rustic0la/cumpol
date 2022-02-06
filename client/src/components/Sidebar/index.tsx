import { Box, Flex } from '@chakra-ui/react';
import React, { FC, memo } from 'react';

import Loading from '../common/Loading';
import AddSpace from './components/AddSpace';
import Space from './components/Space';
import { useSpacesHandlers } from './hooks/useSpacesHandlers';

const Sidebar: FC = memo(() => {
  const { loading, spaces, spaceId, handleDeleteSpace, handleSelectSpace } = useSpacesHandlers();

  return (
    <Box overflow="auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Flex flexFlow="column" justify="center" gap={3} mb={5}>
            {spaces.map((space) => (
              <Space
                isCurrent={space.id === spaceId}
                key={space.id}
                space={space}
                onDelete={handleDeleteSpace}
                onSelect={handleSelectSpace}
              />
            ))}
          </Flex>
          <AddSpace />
        </>
      )}
    </Box>
  );
});
Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;

export default Sidebar;
