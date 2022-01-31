import styled from 'styled-components';

export const LayoutStyled = styled.div`
  padding: 20px;
  height: 100vh;
`;

export const GridStyled = styled.div`
  /* margin: 30px 2rem;
  display: flex;*/
  gap: 20px;
  flex: 1 1 0%;
  display: grid;
  -webkit-box-align: stretch;
  align-items: stretch;
  place-content: stretch center;
  padding-top: 24px;
  padding-bottom: 24px;
  grid-template-areas: 'content aside';
  -webkit-box-pack: center;
`;
