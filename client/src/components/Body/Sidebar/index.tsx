import React, { FC, memo, useCallback, useState } from 'react';

import { GetDomainsDomainFragment, useGetDomainsQuery } from '../../../generated/types';
import AddDomainButton from './AddDomainButton';
import Domain from './Domain';
import { SidebarStyled } from './styles';

const Sidebar: FC = memo(() => {
  const { data, loading } = useGetDomainsQuery();

  return (
    <SidebarStyled>
      {/* TODO: add loader */}
      {loading ? 'Loading...' : <SidebarInner domains={data?.getDomains || []} />}
    </SidebarStyled>
  );
});

interface SidebarInnerProps {
  domains: GetDomainsDomainFragment[];
}

const SidebarInner: FC<SidebarInnerProps> = memo(({ domains }) => {
  const [domainsState, setDomainsState] = useState<GetDomainsDomainFragment[]>(() => domains);

  const onDeleteDomain = useCallback((id: string) => {
    setDomainsState((prev) => prev.filter((domain) => domain.id !== id));
  }, []);

  const onUpdateDomain = useCallback((domain?: GetDomainsDomainFragment) => {
    if (domain) {
      setDomainsState((prev) => prev.map((d) => (d.id === domain.id ? domain : d)));
    }
  }, []);

  const onAddDomain = useCallback((addedDomain: GetDomainsDomainFragment) => {
    setDomainsState((prev) => [...prev, addedDomain]);
  }, []);

  return (
    <>
      {domainsState?.map((domain) => (
        <Domain
          key={domain.id}
          onDeleteDomain={onDeleteDomain}
          onUpdateDomain={onUpdateDomain}
          domain={domain}
        />
      ))}
      <AddDomainButton onAddDomain={onAddDomain} />
    </>
  );
});

Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;

SidebarInner.displayName = 'SidebarInner';
SidebarInner.whyDidYouRender = true;

export default Sidebar;
