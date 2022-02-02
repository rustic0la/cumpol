import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Heading, Input, Link, Spinner, Text } from '@chakra-ui/react';
import {
  Maybe,
  MetaFragment,
  TodoFragment,
  useAddMetaMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import Loading from 'src/components/common/Loading';
import isValidURL from 'src/utils/isValidUrl';
interface TodoProps extends TodoFragment {
  checkListId: string;
}

const Todo: FC<TodoProps> = memo(({ checkListId, id, title, meta, isWatched }) => {
  const [inputValue, setInputValue] = useState(() => title);
  const [isWatchedState, setIsWatched] = useState(() => isWatched);

  const handleChangeTodo = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateTodo, { loading: updateLoading }] = useUpdateTodoMutation({
    variables: { todoId: id, title: inputValue, isWatched: isWatchedState, checkListId },
  });

  const [addMeta, { loading: addMetaLoading }] = useAddMetaMutation();

  const [metaState, setMetaState] = useState<Maybe<MetaFragment | undefined>>(() => meta);

  const handleToggleCheckbox = useCallback(() => {
    setIsWatched((prev) => !prev);
  }, []);

  const applyChange = useCallback(() => {
    if (!inputValue.trim()) {
      setInputValue(title);
    } else {
      if (isValidURL(inputValue)) {
        addMeta({ variables: { url: inputValue, todoId: id } }).then((res) =>
          setMetaState(res?.data?.addMeta),
        );
      }
      if (inputValue !== title) updateTodo();
    }
  }, [addMeta, id, inputValue, title, updateTodo]);

  const [deleteTodo, { loading: deleteLoading }] = useDeleteTodoMutation({
    variables: { todoId: id, checkListId },
    // delete from apollo cache
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: 'Todo' });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });

  const handleDeleteTodoClick = useCallback(() => {
    deleteTodo();
  }, [deleteTodo]);

  return (
    <Box bg="gray.100" borderRadius="md" m={1} h="100%" p={2} _hover={{ bg: 'gray.200' }}>
      <Flex align="center" justify="space-between" w="100%" gap={1}>
        <Checkbox isChecked={isWatchedState} onChange={handleToggleCheckbox} />
        {updateLoading || addMetaLoading ? (
          <Loading w="100%" />
        ) : (
          <>
            {/* remove to meta component */}
            {metaState ? (
              <Link
                href={metaState.url}
                target="_blank"
                _hover={{ textDecoration: 'none' }}
                _focus={{ textDecoration: 'none', border: 'none' }}
              >
                <Heading fontSize="14px">{metaState.title}</Heading>
                <Text
                  fontSize="12px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  display="-webkit-box"
                  lineHeight="1.2"
                  lineClamp="2"
                  mt={1}
                  mb={1}
                  style={{
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {metaState.description}
                </Text>
                <Flex gap={2}>
                  {metaState.favicon && <img src={metaState.favicon} width="16px" />}
                  <Text fontSize="12px">{metaState.hostname}</Text>
                </Flex>
              </Link>
            ) : (
              <Input
                fontSize="sm"
                variant="unstyled"
                onClick={(e) => e.target.select()}
                onChange={handleChangeTodo}
                onBlur={applyChange}
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
