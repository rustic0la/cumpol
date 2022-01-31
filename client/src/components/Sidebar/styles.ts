import styled from 'styled-components';

export const SpaceStyled = styled.div<{ isCurrent: boolean }>`
  padding: 10px 20px;
  margin: 10px 0;

  color: ${({ isCurrent }) => (isCurrent ? 'red' : 'black')};
  cursor: pointer;
`;
