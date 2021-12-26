import React, { FC, SyntheticEvent, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import logo from './assets/logo.svg';
import { AUTH_TOKEN } from './constants';
import { useLoginMutation, useSignupMutation } from './generated/types';
import { Login } from './pages/Login';
import {
  Border,
  Collection,
  Content,
  Domain,
  Grid,
  Header,
  Layout,
  LogoStyled,
  Sidebar,
  Title,
  Todo,
  TodosList,
  Wrapper,
} from './styles';
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
      <Grid>
        <Sidebar>
          <Domain>Domain 1</Domain>
          <Domain>Domain 2</Domain>
        </Sidebar>
        <Content>
          <Collection>
            <Title> 1</Title>
            <Border />
            <TodosList>
              <Todo>1</Todo>
              <Todo>2</Todo>
              <Todo>3</Todo>
              <Todo>4</Todo>
              <Todo>5</Todo>
            </TodosList>
          </Collection>
          <Collection>
            <Title> 3</Title>
            <Border />
            <TodosList>
              <Todo>1</Todo>
              <Todo>2</Todo>
              <Todo>3</Todo>
              <Todo>4</Todo>
              <Todo>5</Todo>
            </TodosList>
          </Collection>
        </Content>
      </Grid>
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
