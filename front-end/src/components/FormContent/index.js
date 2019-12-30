import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const FormContent = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(189px, 1fr));
    grid-gap: 16px;
    width: 100%;

    /* grid-gap: 16px; */
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    li {
      display: flex;
      flex-direction: column;

      strong {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 8px;
      }

      input {
        color: #666666;
        font-weight: normal;
        font-size: 16px;
        height: 45px;
        border-radius: 4px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        padding: 16px;
        width: 100%;
      }
      input[type='date']::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type='date']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input:disabled {
        background: #f5f5f5;
        cursor: not-allowed;
      }

      span {
        color: #ee4d64;
        margin-bottom: 16px;
        text-align: left;
        margin-top: 8px;
      }
    }
  }
`;

export const InputAsyncSelect = styled(AsyncSelect)``;
