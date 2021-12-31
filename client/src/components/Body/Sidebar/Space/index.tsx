import { GetSpacesSpaceFragment, useDeleteSpaceMutation, useUpdateSpaceMutation } from '@gql/types';
import React, { BaseSyntheticEvent, FC, memo, useCallback, useState } from 'react';

import { SpaceStyled } from './styles';

interface SpaceProps {
  space: GetSpacesSpaceFragment;
  onDeleteSpace: (id: string) => void;
  onUpdateSpace: (space?: GetSpacesSpaceFragment) => void;
}

const Space: FC<SpaceProps> = memo(({ space, onDeleteSpace, onUpdateSpace }) => {
  const { id, title } = space;
  const [inputValue, setInputValue] = useState(() => title);
  const [deleteSpace] = useDeleteSpaceMutation();

  const handleDeleteSpaceClick = useCallback(
    (e: BaseSyntheticEvent) => {
      const spaceId = e.target.id;
      deleteSpace({ variables: { spaceId } }).then(() => onDeleteSpace(spaceId));
    },
    [deleteSpace, onDeleteSpace],
  );

  const handleChangeSpace = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateSpace] = useUpdateSpaceMutation({
    variables: { spaceId: id, title: inputValue },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateSpace().then((res) => onUpdateSpace(res.data?.updateSpace));
    }
  }, [inputValue, title, updateSpace, onUpdateSpace]);

  return (
    // TODO: fix style
    <div style={{ display: 'flex' }}>
      <SpaceStyled
        type="text"
        onChange={handleChangeSpace}
        onBlur={saveChange}
        value={inputValue}
      />
      <button id={id} onClick={handleDeleteSpaceClick}>
        -
      </button>
    </div>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
