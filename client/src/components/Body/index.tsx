import React from 'react';
import { FC } from 'react';

import MainContent from './Main';
import Sidebar from './Sidebar';
import { Grid } from './styles';

const Body: FC = () => {
  return (
    <Grid>
      <Sidebar />
      <MainContent />
    </Grid>
  );
};

export default Body;
