import styled from 'styled-components';

export const FormContent = styled.div`
  div {
    display: flex;
    justify-content: space-between;

    strong {
      font-weight: bold;
      font-size: 14px;
      width: 100%;
    }

    strong + strong {
      margin-left: 16px;
    }

    input {
      width: 100%;
      font-weight: normal;
      font-size: 16px;
      height: 45px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      padding: 16px;
      margin-top: 8px;
    }

    input + input {
      margin-left: 16px;
    }
  }

  div + div {
    margin-top: 8px;
  }
`;
