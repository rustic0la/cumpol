import { SpacesUpdatedDocument, SpacesUpdatedSubscription, useGetSpacesQuery } from '@gql/types';
import React, { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AddSpace from './AddSpace';
import Space from './SpaceItem';
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

  const spaces = useMemo(() => data?.getSpaces || [], [data?.getSpaces]);

  const navigate = useNavigate();
  const { spaceId } = useParams();

  useEffect(() => {
    const firstId = spaces[0]?.id || '';
    if (!spaceId && firstId) {
      navigate(`${firstId}`);
    }
  }, [spaces, navigate, spaceId]);

  const handleSelectSpace = useCallback(
    (id: string) => {
      if (spaceId !== id) navigate(`${id}`);
    },
    [navigate, spaceId],
  );

  // const handleAddSpace = useCallback(() => {
  //   const newSpaceId = spaces[spaces.length - 1].id;
  //   if (spaceId !== newSpaceId) navigate(`${newSpaceId}`);
  // }, [navigate, spaceId, spaces]);

  const handleDeleteSpace = useCallback(
    (id: string) => {
      if (spaceId === id) {
        const currentIdIdx = spaces.map(({ id }) => id).indexOf(id);
        navigate(`${spaces[currentIdIdx + 1]?.id || ''}`);
      }
    },
    [navigate, spaceId, spaces],
  );

  return (
    <SidebarStyled>
      {/* TODO: add loader */}
      {loading ? (
        'Loading...'
      ) : (
        <>
          {spaces.map((space) => (
            <Space
              isCurrent={space.id === spaceId}
              key={space.id}
              space={space}
              onSelect={handleSelectSpace}
              onDelete={handleDeleteSpace}
            />
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
