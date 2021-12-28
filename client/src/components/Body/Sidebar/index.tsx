import React, { FC, memo, useCallback, useState } from 'react';

import { GetDomainsDomainFragment, useGetDomainsQuery } from '../../../generated/types';
import AddDomainButton from './AddDomain';
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
Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;
interface SidebarInnerProps {
  domains: GetDomainsDomainFragment[];
}

const SidebarInner: FC<SidebarInnerProps> = memo(({ domains }) => {
  const [domainsState, setDomainsState] = useState(() => domains);

  const handleDeleteDomain = useCallback((id: string) => {
    setDomainsState((prev) => prev.filter((domain) => domain.id !== id));
  }, []);

  const handleUpdateDomains = useCallback((domain?: GetDomainsDomainFragment) => {
    if (domain) {
      setDomainsState((prev) => prev.map((d) => (d.id === domain.id ? domain : d)));
    }
  }, []);

  const handleAddDomain = useCallback((addedDomain: GetDomainsDomainFragment) => {
    setDomainsState((prev) => [...prev, addedDomain]);
  }, []);

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
      <AddDomainButton onAddDomain={handleAddDomain} />
    </>
  );
});
SidebarInner.displayName = 'SidebarInner';
SidebarInner.whyDidYouRender = true;

export default Sidebar;
