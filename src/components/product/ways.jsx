import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'ui/button';
import map from 'lodash-es/map';
import products from 'constants/products.json';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';

const Container = styled.div`
  padding: 0.1rem 0.2rem;
`;

const Title = styled.p`
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: #9b9b9b;
`;

const Card = styled.div`
  background-color: white;
  margin-top: 0.1rem;
  margin-bottom: 0.05rem;
`;

const Head = styled.div`
  padding: 0.2rem 0.15rem 0.1rem 0.2rem;
  margin-right: 0.05rem;
  overflow: auto;
  border-bottom: 1px solid #f4f3f3;
`;

const Content = styled.div`
  padding: 0.1rem 0.15rem 0.15rem;
  font-size: 0.14rem;
  color: #4a4a4a;
  line-height: 0.2rem;
`;

const Price = styled.p`
  /* ¥ 6500: */
  margin-left: 0.05rem;
  font-size: 0.2rem;
  color: #e01053;
  float: left;
`;

const Right = styled.span`
  /* 1/20 个车位: */
  line-height: 0.28rem;
  font-size: 0.14rem;
  color: #4a4a4a;
  float: right;
`;

const PaymentDesc = styled.span`
  line-height: 0.28rem;
  font-size: 0.12rem;
  color: #9b9b9b;
  float: left;
`;

const Time = styled.p`
  margin: 0.05rem 0 0;
  font-size: 0.12rem;
  line-height: 0.18rem;
  color: #4a4a4a;
  span {
    color: #9b9b9b;
  }
  &:last-of-type {
    margin-bottom: 0.2rem;
  }
`;

const Intro = () => (
  <Container>
    <Title>订购方式</Title>
    {map(products, product => (
      <Card key={product.id}>
        <Head>
          <Right>{product.right}</Right>
          <Price>￥ {product.price}</Price>
          {!!product.payment && <PaymentDesc>{product.payment}</PaymentDesc>}
        </Head>
        <Content>
          {product.desc}
          <Time>
            <span>开始收益时间</span> {format(addDays(new Date(), 7), 'YYYY年MM月DD')}
          </Time>
          <Link to={`/orders/new?paymentId=${product.id}`}>
            <Button>确认购买</Button>
          </Link>
        </Content>
      </Card>
    ))}
  </Container>
);

export default Intro;
