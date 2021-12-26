import React, { FC } from 'react';

import Collection from './Collection';
import { MainContentStyled } from './styles';

const MainContent: FC = () => {
  return (
    <MainContentStyled>
      <Collection />
      <Collection />
      <Collection />
    </MainContentStyled>
  );
};

export default MainContent;
