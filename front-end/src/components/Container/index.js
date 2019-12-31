import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  height: auto;
  width: 100%;
  max-width: ${props => props['max-width']};
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 32px;
  flex-direction: column;
  display: flex;
`;
