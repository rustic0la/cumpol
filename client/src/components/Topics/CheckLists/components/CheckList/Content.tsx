import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

import { useCheckListHandlers } from '../../hooks/useCheckListHandlers';
import Todos from '../../Todos';
import { ContentProps } from './interfaces';

const Content: FC<ContentProps> = ({ checkListId, topicId }) => {
  const { id, todos } = useCheckListHandlers({ checkListId, topicId });

  return (
    <Flex flexFlow="column" h={72} overflow="auto" align="center">
      <Todos checkListId={id} todos={todos} />
    </Flex>
  );
};

export default Content;
