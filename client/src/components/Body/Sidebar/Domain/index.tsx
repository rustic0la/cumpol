import React, { BaseSyntheticEvent, FC, memo, useCallback, useState } from 'react';

import {
  GetDomainsDomainFragment,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from '../../../../generated/types';
import { DomainStyled } from './styles';

interface DomainProps {
  domain: GetDomainsDomainFragment;
  onDeleteDomain: (id: string) => void;
  onUpdateDomain: (domain?: GetDomainsDomainFragment) => void;
}

const Domain: FC<DomainProps> = memo(({ domain, onDeleteDomain, onUpdateDomain }) => {
  const { id, title } = domain;
  const [inputValue, setInputValue] = useState(() => title);
  const [deleteDomain] = useDeleteDomainMutation();

  const handleDeleteDomainClick = useCallback(
    (e: BaseSyntheticEvent) => {
      const domainId = e.target.id;
      deleteDomain({ variables: { domainId } }).then(() => onDeleteDomain(domainId));
    },
    [deleteDomain, onDeleteDomain],
  );

  const handleChangeDomain = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const [updateDomain] = useUpdateDomainMutation({
    variables: { domainId: id, title: inputValue },
  });

  const saveChange = useCallback(() => {
    if (!inputValue) {
      setInputValue(title);
    } else {
      updateDomain().then((res) => onUpdateDomain(res.data?.updateDomain));
    }
  }, [inputValue, title, updateDomain, onUpdateDomain]);

  return (
    // TODO: fix style
    <div style={{ display: 'flex' }}>
      <DomainStyled
        type="text"
        onChange={handleChangeDomain}
        onBlur={saveChange}
        value={inputValue}
      />
      <button id={id} onClick={handleDeleteDomainClick}>
        -
      </button>
    </div>
  );
});

Domain.displayName = 'Domain';
Domain.whyDidYouRender = true;

export default Domain;
