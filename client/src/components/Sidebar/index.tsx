import { Box, Flex, List } from '@chakra-ui/react';
import { SpacesUpdatedDocument, SpacesUpdatedSubscription, useGetSpacesQuery } from '@gql/types';
import React, { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../common/Loading';
import AddSpace from './AddSpace';
import Space from './SpaceItem';

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

  const handleSelectSpace = useCallback(
    (id: string) => {
      if (spaceId !== id) navigate(`${id}`);
    },
    [navigate, spaceId],
  );

  return (
    <Box overflow="auto">
      {loading ? (
        <Loading />
      ) : (
        <Flex flexFlow="column" justify="center">
          <List>
            {spaces.map((space) => (
              <Space
                isCurrent={space.id === spaceId}
                key={space.id}
                space={space}
                onDelete={handleDeleteSpace}
                onSelect={handleSelectSpace}
              />
            ))}
          </List>
          <AddSpace />
        </Flex>
      )}
    </Box>
  );
});
Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;

export default Sidebar;
