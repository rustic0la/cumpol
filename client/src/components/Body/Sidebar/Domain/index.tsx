import React, { FC } from 'react';

import { DomainStyled } from './styles';

interface DomainProps {
  title: string;
}

const Domain: FC<DomainProps> = ({ title }) => {
  return <DomainStyled>{title}</DomainStyled>;
};

export default Domain;
