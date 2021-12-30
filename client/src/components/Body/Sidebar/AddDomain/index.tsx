import React, { FC, memo, useCallback } from 'react';

// TODO: add alias
import { useAddDomainMutation } from '../../../../generated/types';
import { AddDomainButtonStyled } from './styles';

// interface AddDomainButtonProps {
//   onAddDomain: (domain: GetDomainsDomainFragment) => void;
// }

const AddDomainButton: FC = memo(() => {
  const [addDomain, { loading }] = useAddDomainMutation({
    variables: {
      title: 'New Domain',
    },
  });

  const handleAddDomainClick = useCallback(() => {
    addDomain();
  }, [addDomain]);

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
