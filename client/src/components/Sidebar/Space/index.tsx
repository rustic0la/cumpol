import { SpaceFragment, useDeleteSpaceMutation, useUpdateSpaceMutation } from '@gql/types';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';

import { SpaceStyled } from './styles';

interface SpaceProps {
  space: SpaceFragment;
  onSelect: (id: string) => void;
}

const Space: FC<SpaceProps> = memo(({ space, onSelect }) => {
  const { id, title } = space;
  const [inputValue, setInputValue] = useState(() => title);

  const [updateSpace] = useUpdateSpaceMutation({
    variables: { spaceId: id, title: inputValue },
  });
  const [deleteSpace] = useDeleteSpaceMutation();

  const handleDeleteSpaceClick = useCallback(() => {
    deleteSpace({ variables: { spaceId: id } });
  }, [deleteSpace, id]);

  const handleChangeSpace = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateSpace();
    }
  }, [inputValue, title, updateSpace]);

  return (
    // TODO: fix style
    <div style={{ display: 'flex' }}>
      <SpaceStyled
        type="text"
        onChange={handleChangeSpace}
        onBlur={saveChange}
        value={inputValue}
        onClick={() => onSelect(id)}
      />
      <button onClick={handleDeleteSpaceClick}>-</button>
    </div>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
