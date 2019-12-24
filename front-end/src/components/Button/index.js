import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background: ${props => props.background || '#ee4d64'};
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  height: 36px;
  width: ${props => props.width};
  border: none;
  border-radius: 4px;
  text-align: right;
  padding: 10px 16px;
`;

export const SecondaryButton = styled.button`
  border: none;
  background: none;
  color: ${props => props.color};
`;
