import {
  CheckListsUpdatedDocument,
  CheckListsUpdatedSubscription,
  useGetCheckListsLazyQuery,
} from '@gql/types';
import React, { FC, memo, RefObject, useEffect, useRef } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import AddCheckList from './AddCheckList';
import CheckList from './CheckList';
import { CheckListsStyled } from './styles';

interface CheckListsProps {
  topicId: string;
}

interface SubscriptionData {
  subscriptionData: {
    data: CheckListsUpdatedSubscription;
  };
}

const CheckLists: FC<CheckListsProps> = memo(({ topicId }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const isVisible = useOnScreen(ref);

  const [getCheckLists, { data, subscribeToMore, loading }] = useGetCheckListsLazyQuery({
    variables: { topicId },
  });

  useEffect(() => {
    if (isVisible && !data && !loading) {
      getCheckLists();
    }
  }, [getCheckLists, isVisible, data, loading]);

  useEffect(
    () =>
      subscribeToMore({
        document: CheckListsUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          const newData = subscriptionData.data;
          if (!newData) return prev;
          const { checkListsUpdated } = newData;

          if (checkListsUpdated[0].topicId === topicId) {
            if (checkListsUpdated.length === 0) return { getCheckLists: [] };
            return {
              getCheckLists: checkListsUpdated,
            };
          }
          return {
            getCheckLists: prev.getCheckLists,
          };
        },
      }),
    [subscribeToMore, topicId],
  );

  return (
    <CheckListsStyled ref={ref}>
      {(data?.getCheckLists || []).map((checkList) => (
        <CheckList key={checkList.id} checkList={checkList} topicId={topicId} />
      ))}
      <AddCheckList topicId={topicId} />
    </CheckListsStyled>
  );
});

CheckLists.displayName = 'CheckLists';
CheckLists.whyDidYouRender = true;

export default CheckLists;
