import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const Layout = styled.div`
  background-color: #a0fffc;
  padding-top: 20px;
`;

export const Header = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 80px 20px;
`;

export const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Grid = styled.div`
  margin: 30px 10rem;
  display: grid;
  grid-template-columns: 10% 1fr;
  height: 100%;
`;

export const Sidebar = styled.div`
  width: max-content;
  position: sticky;
  top: 70px;
`;

export const Domain = styled.h2`
  padding: 10px 20px;
  margin: 10px 0;
`;

export const Border = styled.div`
  background-color: #364b60;
  height: 3px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

export const Content = styled.div`
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
