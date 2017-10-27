import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.14rem;
  padding: 0.2rem;
  line-height: 0.4rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid #e7e7e7;
  border-top: none;
`;

const Header = styled(Row)`
  background-color: #0889ff;
  border: none;
`;

const TipRow = styled.div`
  border: 1px solid #e7e7e7;
  border-top: none;

  p {
    text-align: left;
    padding-left: 0.1rem;
  }
`;

const Cell = styled.p`color: #666666;`;

const HeadCell = styled(Cell)`color: #ffffff;`;

const Desc = () => (
  <Container>
    <Header>
      <HeadCell>代理人</HeadCell>
      <HeadCell>1人</HeadCell>
      <HeadCell>5人</HeadCell>
      <HeadCell>10人</HeadCell>
    </Header>
    <Row>
      <Cell>提成</Cell>
      <Cell>1万元</Cell>
      <Cell>5万元</Cell>
      <Cell>10万元</Cell>
    </Row>
    <Row>
      <Cell>补贴</Cell>
      <Cell>54万元</Cell>
      <Cell>270万元</Cell>
      <Cell>540万元</Cell>
    </Row>
    <Row>
      <Cell>总计</Cell>
      <Cell>55万元</Cell>
      <Cell>275万元</Cell>
      <Cell>550万元</Cell>
    </Row>
    <TipRow>
      <Cell>＊（不含车位自身收益及升值收益）</Cell>
    </TipRow>
  </Container>
);

export default Desc;
