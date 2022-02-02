import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Input, Spinner } from '@chakra-ui/react';
import {
  CheckListFragment,
  useDeleteCheckListMutation,
  useGetCheckListByIdQuery,
  useUpdateCheckListMutation,
} from '@gql/types';
import React, {
  ChangeEvent,
  FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Loading from 'src/components/common/Loading';
import useOnScreen from 'src/hooks/useOnScreen';

import Todos from './Todos';
import AddTodo from './Todos/AddTodo';

interface CheckListWrapperProps {
  checkListId: string;
  topicId: string;
}

const CheckListWrapper: FC<CheckListWrapperProps> = memo((props) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  // prevent from dissappearing while scrolling
  const [isVisibleState, setIsVisibleState] = useState<boolean | undefined>();
  useEffect(() => {
    if (isVisible) {
      setIsVisibleState(isVisible);
    }
  }, [isVisible]);

  return (
    <Box ref={ref} w={80} h={400} bg="pink" m="0 10px" borderRadius="xl">
      {isVisibleState && <CheckListInner {...props} />}
    </Box>
  );
});
CheckListWrapper.displayName = 'CheckListWrapper';
CheckListWrapper.whyDidYouRender = true;

type CheckListInnerProps = CheckListWrapperProps;

const CheckListInner: FC<CheckListInnerProps> = memo(({ checkListId, topicId }) => {
  const { data, loading } = useGetCheckListByIdQuery({
    variables: { checkListId },
  });

  const checkList = data?.getCheckListById;
  const title = checkList?.title || '';
  const id = checkList?.id || '';
  const todos = checkList?.todos || [];

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const handleChangeCheckList = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateCheckList] = useUpdateCheckListMutation({
    variables: { checkListId: id, title: inputValue, topicId },
  });

  const applyChange = useCallback(() => {
    if (!inputValue.trim()) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateCheckList();
    }
  }, [inputValue, title, updateCheckList]);

  const [deleteCheckList, { loading: deleteLoading }] = useDeleteCheckListMutation({
    variables: { checkListId: id, topicId },
  });

  const handleDeleteCheckListClick = useCallback(() => {
    deleteCheckList();
  }, [deleteCheckList]);

  return (
    <>
      {loading || !id ? (
        <Loading />
      ) : (
        <Flex flexFlow="column" justify="space-between" h="100%" p="10px, 0">
          <Box h="100%">
            <Flex p="10px 15px" align="center">
              <Input
                variant="unstyled"
                onChange={handleChangeCheckList}
                onBlur={applyChange}
                value={inputValue}
              />
              {deleteLoading ? (
                <Spinner size="sm" />
              ) : (
                <DeleteIcon
                  onClick={handleDeleteCheckListClick}
                  color="gray.400"
                  _hover={{ color: 'gray.600' }}
                  cursor="pointer"
                />
              )}
            </Flex>

            <Flex flexFlow="column" h={80} overflow="auto" align="center">
              <Todos checkListId={id} todos={todos} />
            </Flex>
          </Box>
          <AddTodo checkListId={checkListId} />
        </Flex>
      )}
    </>
  );
});
CheckListInner.displayName = 'CheckListInner';
CheckListInner.whyDidYouRender = true;

export default CheckListWrapper;
