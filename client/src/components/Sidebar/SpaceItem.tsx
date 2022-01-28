import { SpaceFragment, useDeleteSpaceMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

import { SpaceStyled } from './styles';

interface SpaceProps {
  space: SpaceFragment;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isCurrent: boolean;
}

const Space: FC<SpaceProps> = memo(({ space, onSelect, onDelete, isCurrent }) => {
  const { id, title } = space;
  // const [inputValue, setInputValue] = useState(() => title);

  // const [updateSpace] = useUpdateSpaceMutation({
  //   variables: { spaceId: id, title: inputValue },
  // });
  const [deleteSpace] = useDeleteSpaceMutation();

  const handleDeleteSpaceClick = useCallback(() => {
    deleteSpace({ variables: { spaceId: id } }).then(() => onDelete(id));
  }, [deleteSpace, id, onDelete]);

  // const handleChangeSpace = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // }, []);

  // const saveChange = useCallback(() => {
  //   if (!inputValue) {
  //     setInputValue(title);
  //   } else {
  //     if (inputValue !== title) updateSpace();
  //   }
  // }, [inputValue, title, updateSpace]);

  return (
    // TODO: fix style
    <div style={{ display: 'flex' }}>
      <SpaceStyled
        isCurrent={isCurrent}
        // onChange={handleChangeSpace}
        // onBlur={saveChange}
        // value={inputValue}
        onClick={() => onSelect(id)}
      >
        {title}
      </SpaceStyled>
      <button onClick={handleDeleteSpaceClick}>-</button>
    </div>
  );
});

Space.displayName = 'Space';
Space.whyDidYouRender = true;

export default Space;
