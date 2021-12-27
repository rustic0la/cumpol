import { ApolloQueryResult } from '@apollo/client';
import React, { FC, memo } from 'react';

// TODO: add alias
import { GetDomainsDomainFragment, useAddDomainMutation } from '../../../../generated/types';
import { AddDomainButtonStyled } from './styles';

interface AddDomainButtonProps {
  onAddDomain?: (domain: GetDomainsDomainFragment) => void;
}

const AddDomainButton: FC<AddDomainButtonProps> = memo(({ onAddDomain }) => {
  const [addDomain, { loading }] = useAddDomainMutation({
    variables: {
      title: 'New Domain',
    },
  });

  const handleAddDomainClick = () => {
    addDomain().then((res) => {
      if (!loading && res.data?.addDomain) {
        onAddDomain?.(res.data?.addDomain);
      }
    });
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <AddDomainButtonStyled onClick={handleAddDomainClick}>Add Domain</AddDomainButtonStyled>
  );
});

AddDomainButton.displayName = 'AddDomainButton';
AddDomainButton.whyDidYouRender = true;

export default AddDomainButton;
