import styled from 'styled-components';

export const Container = styled.div`
  padding: 0.15rem;
  background-color: white;
  flex: 1;
  /* 第三条：到及验证个人邮箱: */
  font-family: PingFangSC-Medium;
  font-size: 0.12rem;
  line-height: 0.18rem;
  color: #2E3236;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  p {
    margin: 0.1rem 0 0;
    text-indent: 2em;
  }
`;

export const Title = styled.div`
  color: #2E3236;
  font-size: 0.14rem;
  text-align: center;
`;
