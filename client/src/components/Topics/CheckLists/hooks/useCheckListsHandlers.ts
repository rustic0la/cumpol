import { useSubscription } from '@apollo/client';
import { CheckListsIdsUpdatedDocument, CheckListsIdsUpdatedSubscription } from '@gql/types';
import { useEffect, useState } from 'react';

interface UseCheckListsHandlersOptions {
  checkListsIds: string[];
  topicId: string;
}
export const useCheckListsHandlers = ({ checkListsIds, topicId }: UseCheckListsHandlersOptions) => {
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

  return { ids };
};
