import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  height: auto;
  background: #fff;

  form {
    display: flex;
    flex-direction: column;
    margin: 32px;

    strong {
      font-weight: bold;
      font-size: 14px;
      align-self: flex-start;
    }

    input {
      font-weight: normal;
      font-size: 16px;
      height: 45px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      padding: 16px;
      margin-top: 8px;
      margin-bottom: 16px;
    }

    button {
      background: #ee4d64;
      color: #fff;
      border: 0;
      border-radius: 4px;
      height: 45px;
      font-weight: bold;
      font-size: 16px;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
