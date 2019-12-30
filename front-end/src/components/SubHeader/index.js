import styled from 'styled-components';

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
  }
`;

export const SubHeaderTitle = styled.strong`
  color: #444444;
  font-weight: bold;
  font-size: 24px;
`;
