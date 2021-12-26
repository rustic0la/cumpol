import React, { FC } from 'react';

import Domain from './Domain';
import { SidebarStyled } from './styles';

const Sidebar: FC = () => {
  return (
    <SidebarStyled>
      <Domain title="Domain 1" />
      <Domain title="Domain 2" />
    </SidebarStyled>
  );
};

export default Sidebar;
