import { Box, Flex } from '@chakra-ui/react';
import React, { FC, memo } from 'react';
import Loading from 'src/components/common/Loading';

import { useCheckListHandlers } from '../../hooks/useCheckListHandlers';
import AddTodo from '../../Todos/components/AddTodo';
import Content from './Content';
import Header from './Header';
import { CheckListInnerProps } from './interfaces';

const CheckListInner: FC<CheckListInnerProps> = memo(({ checkListId, topicId }) => {
  const { loading, id } = useCheckListHandlers({ checkListId, topicId });

  return (
    <>
      {loading || !id ? (
        <Loading />
      ) : (
        <Flex flexFlow="column" justify="space-between" h="100%">
          <Box h="100%">
            <Header checkListId={checkListId} topicId={topicId} />
            <Content checkListId={checkListId} topicId={topicId} />
          </Box>
          <AddTodo checkListId={checkListId} />
        </Flex>
      )}
    </>
  );
});

CheckListInner.displayName = 'CheckListInner';
CheckListInner.whyDidYouRender = true;

export default CheckListInner;
