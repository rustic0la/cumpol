import { Box, Input } from '@chakra-ui/react';
import {
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
    <Box ref={ref} w={80} h={400} bg="pink" m="0 20px" borderRadius="xl">
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
  const todosIds = checkList?.todosIds || [];

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
    if (!inputValue) {
      setInputValue(id);
    } else {
      if (inputValue !== id) updateCheckList();
    }
  }, [inputValue, id, updateCheckList]);

  const [deleteCheckList] = useDeleteCheckListMutation({ variables: { checkListId: id, topicId } });

  const handleDeleteCheckListClick = useCallback(() => {
    deleteCheckList();
  }, [deleteCheckList]);

  return (
    <>
      {loading || !id ? (
        <Loading />
      ) : (
        <>
          <Input
            variant="flushed"
            onChange={handleChangeCheckList}
            onBlur={applyChange}
            value={inputValue}
          />
          <button onClick={handleDeleteCheckListClick}>-</button>
          <Todos checkListId={id} todosIds={todosIds} />
          <AddTodo checkListId={checkListId} />
        </>
      )}
    </>
  );
});
CheckListInner.displayName = 'CheckListInner';
CheckListInner.whyDidYouRender = true;

export default CheckListWrapper;
