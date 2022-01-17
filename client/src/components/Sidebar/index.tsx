import { SpacesUpdatedDocument, SpacesUpdatedSubscription, useGetSpacesQuery } from '@gql/types';
import React, { FC, memo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AddSpace from './AddSpace';
import Space from './Space';
import { SidebarStyled } from './styles';

interface SubscriptionData {
  subscriptionData: {
    data: SpacesUpdatedSubscription;
  };
}

const Sidebar: FC = memo(() => {
  const { data, loading, subscribeToMore } = useGetSpacesQuery();

  useEffect(
    () =>
      subscribeToMore({
        document: SpacesUpdatedDocument,
        updateQuery: (prev, { subscriptionData }: SubscriptionData) => {
          if (!subscriptionData.data) return prev;
          const { spacesUpdated } = subscriptionData.data;

          return {
            getSpaces: spacesUpdated,
          };
        },
      }),
    [subscribeToMore],
  );

  const navigate = useNavigate();
  const handleSelectSpace = useCallback(
    (spaceId: string) => {
      navigate(`${spaceId}`);
    },
    [navigate],
  );

  return (
    <SidebarStyled>
      {/* TODO: add loader */}
      {loading ? (
        'Loading...'
      ) : (
        <>
          {(data?.getSpaces || []).map((space) => (
            <Space key={space.id} space={space} onSelect={handleSelectSpace} />
          ))}
          <AddSpace />
        </>
      )}
    </SidebarStyled>
  );
});
Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;

export default Sidebar;
