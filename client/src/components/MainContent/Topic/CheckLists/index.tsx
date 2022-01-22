import {
  CheckListsUpdatedDocument,
  CheckListsUpdatedSubscription,
  useGetCheckListsLazyQuery,
} from '@gql/types';
import React, { FC, memo, RefObject, useEffect, useRef } from 'react';
import useOnScreen from 'src/hooks/useOnScreen';

import AddCheckList from './AddCheckList';
import { CheckListsStyled } from './styles';
import CheckList from './CheckList';

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

  const [getCheckLists, { data, subscribeToMore }] = useGetCheckListsLazyQuery({
    variables: { topicId },
  });

  useEffect(() => {
    if (isVisible && !data) {
      getCheckLists();
    }
  }, [getCheckLists, isVisible, data]);

  useEffect(
    () =>
      subscribeToMore({
        document: CheckListsUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          const newData = subscriptionData.data;
          if (!newData) return prev;
          const { checkListsUpdated } = newData;

          if (checkListsUpdated[0].topicId === topicId) {
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
