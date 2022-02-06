import { SpacesUpdatedDocument, SpacesUpdatedSubscription, useGetSpacesQuery } from '@gql/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface SubscriptionData {
  subscriptionData: {
    data: SpacesUpdatedSubscription;
  };
}

export const useSpacesHandlers = () => {
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

  return { loading, spaces, spaceId, handleDeleteSpace, handleSelectSpace };
};
