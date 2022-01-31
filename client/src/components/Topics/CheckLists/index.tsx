import { useSubscription } from '@apollo/client';
import { CheckListsIdsUpdatedDocument, CheckListsIdsUpdatedSubscription } from '@gql/types';
import React, { FC, memo, useEffect, useState } from 'react';

import CheckList from './CheckListItem';

interface CheckListsProps {
  topicId: string;
  checkListsIds: string[];
}

const CheckLists: FC<CheckListsProps> = memo(({ topicId, checkListsIds }) => {
  const [ids, setIds] = useState<string[]>(() => checkListsIds);

  const { data, loading }: { data?: CheckListsIdsUpdatedSubscription; loading: boolean } =
    useSubscription(CheckListsIdsUpdatedDocument, {
      variables: { topicId },
    });

  useEffect(() => {
    if (!loading && data?.checkListsIdsUpdated.topicId === topicId) {
      setIds(data?.checkListsIdsUpdated.checkListsIds || []);
    }
  }, [
    data?.checkListsIdsUpdated.checkListsIds,
    data?.checkListsIdsUpdated.topicId,
    loading,
    topicId,
  ]);

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
