import React, { FC, memo, useCallback, useState } from 'react';

import {
  GetDomainsDomainFragment,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from '../../../../generated/types';
import { DomainStyled } from './styles';

interface DomainProps {
  domain: GetDomainsDomainFragment;
  onDeleteDomain?: (id: string) => void;
}

const Domain: FC<DomainProps> = memo(({ domain, onDeleteDomain }) => {
  const { id, title } = domain;
  const [inputValue, setInputValue] = useState(() => title);
  const [deleteDomain] = useDeleteDomainMutation();

  const handleDeleteDomainClick = (id: string) => {
    deleteDomain({ variables: { domainId: id } });
    onDeleteDomain?.(id);
  };

  const [updateDomain] = useUpdateDomainMutation();

  const handleChangeDomain = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const update = useCallback(() => {
    updateDomain({ variables: { domainId: id, title: inputValue } });
  }, [id, inputValue, updateDomain]);

  return (
    // TODO: fix style
    <div style={{ display: 'flex' }}>
      <DomainStyled type="text" onChange={handleChangeDomain} onBlur={update} value={inputValue} />
      <button onClick={() => handleDeleteDomainClick(id)}>-</button>
    </div>
  );
});

Domain.displayName = 'Domain';
Domain.whyDidYouRender = true;

export default Domain;
