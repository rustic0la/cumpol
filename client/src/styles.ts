import styled from 'styled-components';

export const Layout = styled.div`
  background-color: #A0FFFC;
  min-height: 100vh;
  padding-top: 20px;
`;

export const Header = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 0 20px;
`;

export const Grid = styled.div`
  margin-left: 10rem;
  margin-right: 10rem;
  display: grid;
  grid-template-columns: 20% 1fr;
  height: 100%;
`;

export const Sidebar = styled.div`
  div {
    position: sticky;
    top: 70px;
  }
`;

export const Domain = styled.h2`
  padding: 10px 20px;
  margin: 10px 0;
`;

export const Border = styled.div`
  background-color: #364B60;
  height: 3px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

export const Content = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Collection = styled.div`
  display: grid;
`;

export const Title = styled.h1``;

export const TodosList = styled.div`
  display: -webkit-box;
  overflow-x: scroll;
  margin: 10px;
`;

export const Todo = styled.div`
  width: 350px;
  height: 400px;
  background-color: pink;
  margin: 0 20px;
  border-radius: 3%;
`;
