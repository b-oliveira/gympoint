import styled from 'styled-components';

export const FormContent = styled.div`
  > div {
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    display: flex;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      width: 100%;

      strong {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 8px;
      }

      input {
        font-weight: normal;
        font-size: 16px;
        height: 45px;
        border-radius: 4px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        padding: 16px;
      }

      span {
        color: #ee4d64;
        margin-bottom: 16px;
        text-align: left;
        margin-top: 8px;
      }
    }

    div + div {
      margin-left: 16px;
    }
  }
`;
