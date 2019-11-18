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
  text-align: center;
  margin-top: 32px;

  img {
    margin-top: 32px;
  }

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

    span {
      color: #ee4d64;
      margin-top: -8px;
      margin-bottom: 16px;
      text-align: left;
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
