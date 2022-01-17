import React from 'react';
import { useAuth } from 'src/AuthContext';

import logo from '../../assets/logo.svg';
import { HeaderStyled, LogoStyled } from './styles';

const Header = () => {
  const { username, token, logout } = useAuth();

  return (
    <HeaderStyled>
      <LogoStyled>
        <img src={logo} alt="logo" width="60px" />
        <h1>cumpol</h1>
      </LogoStyled>
      {token && (
        <>
          <p>{username}</p>
          <button onClick={logout}>logout</button>
        </>
      )}
    </HeaderStyled>
  );
};

export default Header;
