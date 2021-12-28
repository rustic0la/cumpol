import React, { FC, memo, useCallback, useState } from 'react';

import { CollectionFragment, useGetCollectionsQuery } from '../../../generated/types';
import AddCollectionButton from './AddCollection';
import Collection from './Collection';
import { MainContentStyled } from './styles';

// TODO: get from useParams
const domainID = 'ckxp0bztx154926szjy0hqjot';
const MainContent: FC = memo(() => {
  const { data, loading } = useGetCollectionsQuery({ variables: { domainId: domainID } });

  return (
    <MainContentStyled>
      {/* TODO: add loader */}
      {loading ? 'Loading...' : <MainContentInner collections={data?.getCollections || []} />}
    </MainContentStyled>
  );
});
MainContent.displayName = 'MainContent';
MainContent.whyDidYouRender = true;

interface MainContentInnerProps {
  collections: CollectionFragment[];
}

const MainContentInner: FC<MainContentInnerProps> = memo(({ collections }) => {
  const [collectionsState, setCollectionsState] = useState(() => collections);

  const handleAddCollection = useCallback((collection: CollectionFragment) => {
    setCollectionsState((prev) => [...prev, collection]);
  }, []);

  const handleUpdateCollections = useCallback((collection?: CollectionFragment) => {
    if (collection) {
      setCollectionsState((prev) => prev.map((c) => (c.id === collection.id ? collection : c)));
    }
  }, []);

  const handleDeleteCollection = useCallback((id: string) => {
    setCollectionsState((prev) => prev.filter((collection) => collection.id !== id));
  }, []);

  return (
    <>
      {collectionsState.map((collection) => (
        <Collection
          key={collection.id}
          collection={collection}
          onDeleteCollection={handleDeleteCollection}
          onUpdateCollection={handleUpdateCollections}
        />
      ))}
      <AddCollectionButton onAddCollection={handleAddCollection} />
    </>
  );
});
MainContentInner.displayName = 'MainContentInner';
MainContentInner.whyDidYouRender = true;

export default MainContent;
