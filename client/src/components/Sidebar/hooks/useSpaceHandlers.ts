import { SpaceFragment, useDeleteSpaceMutation } from '@gql/types';
import { useCallback } from 'react';

interface UseSpaceHandlersOptions {
  space: SpaceFragment;
  onDelete: (id: string) => void;
}

export const useSpaceHandlers = ({ space, onDelete }: UseSpaceHandlersOptions) => {
  const { id } = space;

  const [deleteSpace, { loading: deleteLoading }] = useDeleteSpaceMutation();

  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      deleteSpace({ variables: { spaceId: id } }).then(() => onDelete(id));
    },
    [deleteSpace, id, onDelete],
  );

  return {
    id,
    deleteLoading,
    handleDeleteClick,
  };
};
