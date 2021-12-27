import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { GetDomainsDomainFragment, useGetDomainsQuery } from '../../../generated/types';
import AddDomainButton from './AddDomainButton';
import Domain from './Domain';
import { SidebarStyled } from './styles';

const Sidebar: FC = memo(() => {
  const { data, loading } = useGetDomainsQuery();

  const [domains, setDomains] = useState<GetDomainsDomainFragment[]>(() => []);

  useEffect(() => {
    if (!loading) {
      setDomains(data?.getDomains || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const onDeleteDomain = useCallback((id: string) => {
    setDomains(domains.filter((domain) => domain.id !== id));
  }, []);

  const onAddDomain = useCallback((addedDomain: GetDomainsDomainFragment) => {
    setDomains([...domains, addedDomain]);
  }, []);

  return (
    <SidebarStyled>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {domains.map((domain) => (
            <Domain key={domain.id} onDeleteDomain={onDeleteDomain} domain={domain} />
          ))}
          <AddDomainButton onAddDomain={onAddDomain} />
        </>
      )}
    </SidebarStyled>
  );
});

Sidebar.displayName = 'Sidebar';
Sidebar.whyDidYouRender = true;

export default Sidebar;
