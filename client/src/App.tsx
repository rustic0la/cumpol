import React, { FC } from 'react';

import logo from './assets/logo.svg';
import {
  Layout,
  Grid,
  Header,
  Sidebar,
  Collection,
  Domain,
  Content,
  Title,
  Todo,
  TodosList,
  Border,
  LogoStyled,
} from './styles';

// const domains = Array.from()

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
