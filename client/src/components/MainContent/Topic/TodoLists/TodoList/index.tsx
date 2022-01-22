import {
  CheckListFragment,
  useDeleteCheckListMutation,
  useUpdateCheckListMutation,
} from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { CheckListStyled } from './styles';
import Todos from './Todos';

interface CheckListProps {
  checkList: CheckListFragment;
  topicId: string;
}

const CheckList: FC<CheckListProps> = memo(({ checkList, topicId }) => {
  const { id, title } = checkList;
  const [inputValue, setInputValue] = useState(() => title);

  const handleChangeCheckList = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateCheckList] = useUpdateCheckListMutation({
    variables: { checkListId: id, title: inputValue, topicId },
  });

  const applyChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateCheckList();
    }
  }, [inputValue, title, updateCheckList]);

  const [deleteCheckList] = useDeleteCheckListMutation({ variables: { checkListId: id, topicId } });

  const handleDeleteCheckListClick = useCallback(() => {
    deleteCheckList();
  }, [deleteCheckList]);

  return (
    <CheckListStyled>
      <input type="text" onChange={handleChangeCheckList} onBlur={applyChange} value={inputValue} />
      <button onClick={handleDeleteCheckListClick}>-</button>
      <Todos checkListId={id} />
    </CheckListStyled>
  );
});
CheckList.displayName = 'CheckList';

export default CheckList;
