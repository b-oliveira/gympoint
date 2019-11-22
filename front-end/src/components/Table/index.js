import styled from 'styled-components';

export const Table = styled.table`
  background: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 32px;
`;

export const TableColumn = styled.th`
  font-weight: bold;
  font-size: 16px;
  color: #444444;
  text-align: ${props => props['text-align']};
`;

export const TableRow = styled.td`
  font-size: 16px;
  color: #666666;
  text-align: center;
  line-height: 20px;
  border-bottom: 1px solid #eeeeee;
  padding: 16px 0;
  text-align: ${props => props['text-align']};
  max-width: ${props => props['max-width']};
`;
