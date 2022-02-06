import React, { FC, memo } from 'react';

import CheckList from './components/CheckList';
import { useCheckListsHandlers } from './hooks/useCheckListsHandlers';

interface CheckListsProps {
  topicId: string;
  checkListsIds: string[];
}

const CheckLists: FC<CheckListsProps> = memo(({ topicId, checkListsIds }) => {
  const { ids } = useCheckListsHandlers({ topicId, checkListsIds });

  return (
    <>
      {ids.map((checkListId) => (
        <CheckList key={checkListId} checkListId={checkListId} topicId={topicId} />
      ))}
    </>
  );
});

CheckLists.displayName = 'CheckLists';
CheckLists.whyDidYouRender = true;

export default CheckLists;
