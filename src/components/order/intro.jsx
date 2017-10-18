import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PRODUCT_NAME, MINIMAL_PAY } from 'constants/constants.json';

import imgCarport from './carport.jpg';

function cents2Yuan(cents) {
  return cents / 100;
}

function getPaidPrice() {
  // const yuan = cents2Yuan(cents);
  // if (yuan <= MINIMAL_PAY) {
  //   return yuan;
  // }
  return cents2Yuan(MINIMAL_PAY);
}

function getRemainningPriceTips(cents) {
  const yuan = cents2Yuan(cents - MINIMAL_PAY);
  const tips = yuan <= 0 ? '' : `剩余款项 ${yuan}元，`;
  return tips;
}

const Container = styled.div`
  background-color: white;
  padding: 0.2rem 0 0.3rem 0.25rem;
  border-bottom: 1px solid #dbdcdd;
`;

const Title = styled.div`
  overflow: auto;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid #dbdcdd;
  img {
    width: 0.72rem;
    height: 0.72rem;
    float: left;
  }

  p {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #4a4a4a;
    margin-left: 0.9rem;
    margin-bottom: 0.1rem;
  }

  p:last-of-type {
    color: #9b9b9b;
  }
`;

const Detail = styled.div`
  padding: 0.18rem 0.2rem 0 0;
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.2rem;
`;

const Item = styled.p`
  margin-bottom: 0.1rem;
  span {
    float: right;
  }
`;

const ThisPrice = styled.span`
  font-size: 0.18rem;
  color: #e01053;
`;

const Intro = ({ product }) => (
  <Container>
    <Title>
      <img src={imgCarport} alt="" />
      <p>{PRODUCT_NAME}</p>
      <p>{product.get('right')}</p>
    </Title>
    <Detail>
      <Item>
        商品总价<span>￥ {cents2Yuan(product.get('cents'))}</span>
      </Item>
      <Item>
        本次支付<ThisPrice>￥ {getPaidPrice(product.get('cents'))}</ThisPrice>
      </Item>
      <p>{getRemainningPriceTips(product.get('cents'))}将有人工客服与您联系，并签署认购协议。</p>
    </Detail>
  </Container>
);

Intro.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Intro;
