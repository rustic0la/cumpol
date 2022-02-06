import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import Loading from 'src/components/common/Loading';

import CheckLists from '../../CheckLists';
import AddCheckList from '../../CheckLists/components/AddCheckList';
import { useTopicHandlers } from '../../hooks/useTopicHandlers';
import { ContentProps } from './interfaces';

const Content: FC<ContentProps> = ({ spaceId, topicId }) => {
  const { loading, checkListsIds, id } = useTopicHandlers({ spaceId, topicId });

  return (
    <Box display="-webkit-box" overflowX="scroll">
      {loading || !id ? (
        <Loading w={80} h={400} />
      ) : (
        <CheckLists topicId={id} checkListsIds={checkListsIds} />
      )}
      <AddCheckList topicId={topicId} />
    </Box>
  );
};

export default Content;
