import styled from 'styled-components';

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;

    span {
      display: flex;
      align-items: center;
      position: relative;

      svg {
        position: absolute;
        margin-left: 16px;
      }

      input {
        color: #999999;
        font-weight: normal;
        font-size: 14px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        padding: 10px 16px;
        width: 237px;

        &::placeholder {
          padding: 24px;
        }
      }
    }
  }
`;

export const SubHeaderTitle = styled.strong`
  color: #444444;
  font-weight: bold;
  font-size: 24px;
`;
