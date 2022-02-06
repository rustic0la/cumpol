import { SpaceFragment, useUpdateSpaceMutation } from '@gql/types';
import { ChangeEvent, useCallback, useState } from 'react';

interface UseSpaceHandlersOptions {
  space: SpaceFragment;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const usePopoverHandlers = ({
  space,
  inputValue,
  setInputValue,
}: UseSpaceHandlersOptions) => {
  const { id, title } = space;

  const [updateSpace] = useUpdateSpaceMutation({
    variables: { spaceId: id, title: inputValue },
  });
  const [shouldRenderPortal, setShouldRenderPortal] = useState(false);

  const handleClickEdit = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setShouldRenderPortal(true);
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setInputValue(e.target.value);
    },
    [setInputValue],
  );

  const applyChange = useCallback(() => {
    if (!inputValue.trim()) {
      setInputValue(title);
    } else {
      if (inputValue !== title) updateSpace();
    }
    setShouldRenderPortal(false);
  }, [inputValue, setInputValue, title, updateSpace]);

  return { handleClickEdit, inputValue, shouldRenderPortal, handleChange, applyChange };
};
