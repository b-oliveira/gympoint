import styled from 'styled-components';

export const PrimaryButton = styled.button`
  background: ${props => props.background || '#ee4d64'};
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  height: ${props => props.height || '36px'};
  width: ${props => props.width};
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: ${props => props['justify-content'] || 'space-between'};
`;

export const SecondaryButton = styled.button`
  border: none;
  background: none;
  color: ${props => props.color};
`;
