import { GetDomainsDomainFragment, useAddDomainMutation } from '@gql/types';
import React, { FC, memo, useCallback } from 'react';

import { AddDomainButtonStyled } from './styles';

interface AddDomainButtonProps {
  onAddDomain: (domain: GetDomainsDomainFragment) => void;
}

const AddDomainButton: FC<AddDomainButtonProps> = memo(({ onAddDomain }) => {
  const [addDomain, { loading }] = useAddDomainMutation({
    variables: {
      title: 'New Domain',
    },
  });

  const handleAddDomainClick = useCallback(() => {
    addDomain().then((res) => {
      if (!loading && res.data?.addDomain) {
        onAddDomain(res.data?.addDomain);
      }
    });
  }, [addDomain, loading, onAddDomain]);

  return loading ? (
    // TODO: add loader
    <p>Loading</p>
  ) : (
    <AddDomainButtonStyled onClick={handleAddDomainClick}>Add Domain</AddDomainButtonStyled>
  );
});

AddDomainButton.displayName = 'AddDomainButton';
AddDomainButton.whyDidYouRender = true;

export default AddDomainButton;
