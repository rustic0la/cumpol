import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Heading, Input, Link, Spinner, Text } from '@chakra-ui/react';
import React, { FC, memo } from 'react';
import Loading from 'src/components/common/Loading';

import { useTodoHandlers } from '../../hooks/useTodoHandlers';
import Content from './Content';
import { TodoProps } from './interfaces';

const Todo: FC<TodoProps> = memo((props) => {
  const { isWatchedState, handleToggleCheckbox, deleteLoading, handleDeleteTodoClick } =
    useTodoHandlers(props);

  return (
    <Box bg="gray.100" borderRadius="md" m={1} h="100%" p={2} _hover={{ bg: 'gray.200' }}>
      <Flex align="center" justify="space-between" w="100%" gap={2}>
        <Checkbox isChecked={isWatchedState} onChange={handleToggleCheckbox} />
        <Content {...props} />
        {deleteLoading ? (
          <Spinner size="sm" />
        ) : (
          <DeleteIcon
            onClick={handleDeleteTodoClick}
            color="gray.400"
            _hover={{ color: 'gray.600' }}
            cursor="pointer"
          />
        )}
      </Flex>
    </Box>
  );
});

Todo.displayName = 'Todo';
Todo.whyDidYouRender = true;

export default Todo;
