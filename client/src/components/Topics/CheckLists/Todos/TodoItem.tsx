import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Input, Spinner } from '@chakra-ui/react';
import { Maybe, MetaFragment, useDeleteTodoMutation, useUpdateTodoMutation } from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import Loading from 'src/components/common/Loading';
interface TodoProps {
  checkListId: string;
  id: string;
  title: string;
  meta?: Maybe<MetaFragment>;
}

const Todo: FC<TodoProps> = memo(({ checkListId, id, title, meta }) => {
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo, { loading: updateLoading }] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue, checkListId },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateTodo();
    }
  }, [inputValue, title, updateTodo]);

  const [deleteTodo, { loading: deleteLoading }] = useDeleteTodoMutation({
    variables: { todoId: id, checkListId },
  });

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo();
  }, [deleteTodo]);

  return (
    <Box bg="gray.200" borderRadius="md" m={1} h="100%" p={2}>
      <Flex align="center" justify="space-between" w="100%" gap={1}>
        <Checkbox isChecked={true} />
        {updateLoading ? (
          <Loading w="100%" />
        ) : (
          <>
            {/* remove to meta component */}
            {meta ? (
              <>
                {meta?.hostname} {`${meta?.description?.slice(0, 30)}...`} {meta?.title}
                {meta?.img && <img src={meta?.img} />}
                {meta?.favicon && <img src={meta?.favicon} />}
              </>
            ) : (
              <Input
                fontSize="sm"
                variant="unstyled"
                onChange={handleChangeTodo}
                onBlur={saveChange}
                value={inputValue}
              />
            )}
          </>
        )}
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
