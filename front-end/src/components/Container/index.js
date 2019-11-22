import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  height: auto;
  width: 100%;
  max-width: ${props => props['max-width']};
`;
