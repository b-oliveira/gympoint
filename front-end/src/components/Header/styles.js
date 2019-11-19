import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
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
      margin-right: 16px;
      padding-right: 16px;
      border-right: 1px solid #dddddd;
    }

    a {
      font-weight: bold;
      font-size: 15px;
      color: #999999;
      margin: 0 16px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-weight: bold;
      font-size: 14px;
      color: #666666;
    }

    a {
      display: block;
      font-size: 14px;
      color: #de3b3b;
    }
  }
`;
