import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import logo from './assets/logo.svg';
import Body from './components/Body';
import { AUTH_TOKEN } from './constants';
import { Login } from './pages/Login';
import { Header, Layout, LogoStyled } from './styles';
// ffffff-00fff6-1ba5ab-364b60
// ffbda0-ffa780-ff7b40-ff4f00-ff0000-c00000-800000-400000-200000

const Layout1: FC = () => {
  return (
    <>
      <Header>
        <LogoStyled>
          <img src={logo} alt="logo" width="60px" />
          <h1>cumpol</h1>
        </LogoStyled>
        <div>username</div>
      </Header>
      <Body />
    </>
  );
};

const App: FC = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <Routes>
      <Route path="/" element={<Layout>{authToken ? <Layout1 /> : <Login />}</Layout>} />
    </Routes>
  );
};

export default App;
