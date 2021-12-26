import React, { FC } from 'react';

import { TodoStyled } from './styles';

interface TodoProps {
  title: string;
}

const Todo: FC<TodoProps> = ({ title }) => {
  return <TodoStyled>{title}</TodoStyled>;
};

export default Todo;
