import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      padding: 0 30px;
      border-right: 1px solid #dddddd;
    }

    span {
      padding: 0 30px;

      a {
        font-weight: bold;
        font-size: 15px;
        color: #999999;
        text-align: left;

        &:not(:last-child) {
          margin-right: 20px;
        }

        &.active {
          color: #444;
        }
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  padding: 0 30px;
  border-left: 1px solid #eee;
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      font-weight: bold;
      font-size: 14px;
      color: #666666;
    }

    button {
      display: block;
      font-size: 14px;
      color: #de3b3b;
      border: none;
      background: none;
    }
  }
`;
