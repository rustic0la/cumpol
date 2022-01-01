import { GetSpacesSpaceFragment, useGetSpacesQuery } from '@gql/types';
import React, { FC, memo, useState } from 'react';
import useCollectionHandlers from 'src/hooks/useCollectionHandlers';

import AddSpace from './AddSpace';
import Space from './Space';
import { SidebarStyled } from './styles';

const Sidebar: FC = memo(() => {
  const { data, loading } = useGetSpacesQuery();

  // useEffect(
  //   () =>
  //     subscribeToMore({
  //       document: SpaceAddedDocument,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         console.log('subscriptionData', subscriptionData, 'prev', prev);

  //         if (!subscriptionData.data) return prev;
  //         const { spaceAdded } = subscriptionData.data;
  //         const doesExist = prev.getSpaces?.find(({ id }) => id === spaceAdded?.id);
  //         if (doesExist) return prev;

  //         console.log('!!!!', [...(prev.getSpaces || []), spaceAdded]);
  //         return {
  //           ...prev,
  //           getSpaces: [...(prev.getSpaces || []), spaceAdded],
  //         };
  //       },
  //     }),
  //   [subscribeToMore],
  // );

  return (
    <SidebarStyled>
      {/* TODO: add loader */}
      {loading ? 'Loading...' : <SidebarInner spaces={data?.getSpaces || []} />}
    </SidebarStyled>
  );
});
Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;
interface SidebarInnerProps {
  spaces: GetSpacesSpaceFragment[];
}

const SidebarInner: FC<SidebarInnerProps> = memo(({ spaces }) => {
  const [spacesState, setSpacesState] = useState(() => spaces);

  const { handleUpdate, handleDelete, handleAdd } = useCollectionHandlers({
    // @ts-ignore
    setState: setSpacesState,
  });

  return (
    <>
      {spacesState.map((space) => (
        <Space
          key={space.id}
          onDeleteSpace={handleDelete}
          onUpdateSpace={handleUpdate}
          space={space}
        />
      ))}
      <AddSpace onAddSpace={handleAdd} />
    </>
  );
});
SidebarInner.displayName = 'SidebarInner';
SidebarInner.whyDidYouRender = true;

export default Sidebar;
