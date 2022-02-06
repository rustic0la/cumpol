import { Box, Flex } from '@chakra-ui/react';
import React, { FC, memo } from 'react';

import Loading from '../common/Loading';
import AddTopic from './components/AddTopic';
import Topic from './components/Topic';
import { useTopicsHandlers } from './hooks/useTopicsHandlers';

const Topics: FC = memo(() => {
  const { loading, topicsIds, spaceId } = useTopicsHandlers();

  return (
    <Flex flexDirection="column" gap={7} overflow="auto" mb={5}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {topicsIds.map((topicId) => (
            <Topic key={topicId} topicId={topicId} spaceId={spaceId} />
          ))}

          <Box w="100%">
            <AddTopic spaceId={spaceId} />
          </Box>
        </>
      )}
    </Flex>
  );
});
Topics.displayName = 'Topics';
Topics.whyDidYouRender = true;

export default Topics;
