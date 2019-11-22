import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background: #ee4d64;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  padding: 8px;
`;

export const SecondaryButton = styled.button`
  border: none;
  background: none;
  color: ${props => props.color};
`;
