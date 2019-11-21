import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 16px;
  justify-content: center;
  align-items: center;
  height: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;

  strong {
    color: #444444;
    font-weight: bold;
    font-size: 24px;
  }

  button {
    background: #ee4d64;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    padding: 8px;
  }
`;

export const Table = styled.table`
  background: #fff;
  border-radius: 4px;
  width: 100%;
  padding: 32px;
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

export const TableColumn = styled.th`
  font-weight: bold;
  font-size: 16px;
  color: #444444;
  text-align: ${props => props['text-align']};
`;

export const Actions = styled.div``;

export const Button = styled.button`
  border: none;
  background: none;
  color: ${props => props.color};
`;

export const Divider = styled.div`
  width: 24px;
  height: auto;
  display: inline-block;
`;
