import styled from 'styled-components';

export const CollectionStyled = styled.div`
  display: grid;
`;

export const Border = styled.div`
  background-color: #364b60;
  height: 3px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

export const CollectionInnerStyled = styled.div`
  display: -webkit-box;
  overflow-x: scroll;
  margin: 10px;
`;

/**
 * collection title
 * 
 * border: 0;
  font-family: "Signika", sans-serif;
  background-color: transparent;
  width: 160px;
  outline: none;

  font-size: 1.17em;
  font-weight: bold;

  &:focus {
    border-bottom: 4px solid green;
    color: "red";
  }
 */
