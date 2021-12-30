import { SubscribeToMoreOptions } from '@apollo/client';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

import {
  DomainAddedDocument,
  DomainAddedSubscription,
  Exact,
  GetDomainsDomainFragment,
  GetDomainsQuery,
  useGetDomainsQuery,
} from '../../../generated/types';
import AddDomainButton from './AddDomain';
import Domain from './Domain';
import { SidebarStyled } from './styles';

const Sidebar: FC = memo(() => {
  const { data, loading, subscribeToMore } = useGetDomainsQuery();

  useEffect(
    () =>
      subscribeToMore({
        document: DomainAddedDocument,
        updateQuery: (prev, { subscriptionData }) => {
          console.log('subscriptionData', subscriptionData, 'prev', prev);

          if (!subscriptionData.data) return prev;
          const { domainAdded } = subscriptionData.data;
          const doesExist = prev.getDomains?.find(({ id }) => id === domainAdded?.id);
          if (doesExist) return prev;

          console.log('!!!!', [...(prev.getDomains || []), domainAdded]);
          return {
            ...prev,
            getDomains: [...(prev.getDomains || []), domainAdded],
          };
        },
      }),
    [subscribeToMore],
  );

  console.log('data', data);

  return (
    <SidebarStyled>
      {/* TODO: add loader */}
      <SidebarInner domains={data?.getDomains || []} />
    </SidebarStyled>
  );
});
Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;
interface SidebarInnerProps {
  domains: GetDomainsDomainFragment[];
}

const SidebarInner: FC<SidebarInnerProps> = memo(({ domains }) => {
  const [domainsState, setDomainsState] = useState(() => domains);
  console.log('domainsState', domainsState);

  const handleDeleteDomain = useCallback((id: string) => {
    setDomainsState((prev) => prev.filter((domain) => domain.id !== id));
  }, []);

  const handleUpdateDomains = useCallback((domain?: GetDomainsDomainFragment) => {
    if (domain) {
      setDomainsState((prev) => prev.map((d) => (d.id === domain.id ? domain : d)));
    }
  }, []);

  // const handleAddDomain = useCallback((addedDomain: GetDomainsDomainFragment) => {
  //   setDomainsState((prev) => [...prev, addedDomain]);
  // }, []);

  return (
    <>
      {domainsState.map((domain) => (
        <Domain
          key={domain.id}
          onDeleteDomain={handleDeleteDomain}
          onUpdateDomain={handleUpdateDomains}
          domain={domain}
        />
      ))}
      <AddDomainButton />
    </>
  );
});
SidebarInner.displayName = 'SidebarInner';
SidebarInner.whyDidYouRender = true;

export default Sidebar;
