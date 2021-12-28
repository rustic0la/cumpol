import React, { FC } from 'react';

import { TodoListStyled } from './styles';
import Todo from './Todo';

const TodoList: FC = () => {
  return (
    <TodoListStyled>
      <Todo title="1" />
      <Todo title="1" />
      <Todo title="1" />
    </TodoListStyled>
  );
};

export default TodoList;
