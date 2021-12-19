import React, { FC, SyntheticEvent, useState } from 'react';

import logo from './assets/logo.svg';
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

const App: FC = () => {
  return (
    <Layout>
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
          <Domain>Domain 3</Domain>
          <Domain>Domain 4</Domain>
          <Domain>Domain 5</Domain>
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
              <Todo>1</Todo>
              <Todo>2</Todo>
              <Todo>3</Todo>
              <Todo>4</Todo>
              <Todo>5</Todo>
            </TodosList>
          </Collection>
          <Collection>
            <Title> 2</Title>
            <Border />
            <TodosList>
              <Todo>1</Todo>
              <Todo>2</Todo>
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
          <Collection>
            <Title> 4</Title>
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
            <Title> 5</Title>
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
    </Layout>
  );
};

export default App;
