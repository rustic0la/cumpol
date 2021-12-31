import { CollectionFragment, useGetCollectionsQuery } from '@gql/types';
import React, { FC, memo, useCallback, useState } from 'react';

import AddCollection from './AddCollection';
import Collection from './Collection';
import { MainContentStyled } from './styles';

const MainContent: FC = memo(() => {
  // TODO: get from useParams
  const domainId = 'ckxp0bztx154926szjy0hqjot';

  const { data, loading } = useGetCollectionsQuery({ variables: { domainId } });

  return (
    <MainContentStyled>
      {/* TODO: add loader */}
      {loading ? (
        'Loading...'
      ) : (
        <MainContentInner domainId={domainId} collections={data?.getCollections || []} />
      )}
    </MainContentStyled>
  );
});
MainContent.displayName = 'MainContent';
MainContent.whyDidYouRender = true;

interface MainContentInnerProps {
  domainId: string;
  collections: CollectionFragment[];
}

const MainContentInner: FC<MainContentInnerProps> = memo(({ domainId, collections }) => {
  const [collectionsState, setCollectionsState] = useState(() => collections);

  const handleDeleteCollection = useCallback((id: string) => {
    setCollectionsState((prev) => prev.filter((collection) => collection.id !== id));
  }, []);

  const handleUpdateCollections = useCallback((collection?: CollectionFragment) => {
    if (collection) {
      setCollectionsState((prev) => prev.map((c) => (c.id === collection.id ? collection : c)));
    }
  }, []);

  const handleAddCollection = useCallback((collection: CollectionFragment) => {
    setCollectionsState((prev) => [...prev, collection]);
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
      <AddCollection domainId={domainId} onAddCollection={handleAddCollection} />
    </>
  );
});
MainContentInner.displayName = 'MainContentInner';
MainContentInner.whyDidYouRender = true;

export default MainContent;
