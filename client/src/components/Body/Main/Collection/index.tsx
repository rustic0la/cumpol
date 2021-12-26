import React from 'react';
import { FC } from 'react';

import { Border, CollectionStyled } from './styles';
import TodoList from './TodoList';

const Collection: FC = () => {
  return (
    <CollectionStyled>
      <h1> 1</h1>
      <Border />
      <TodoList />
      <h1> 2</h1>
      <Border />
      <TodoList />
    </CollectionStyled>
  );
};

export default Collection;
