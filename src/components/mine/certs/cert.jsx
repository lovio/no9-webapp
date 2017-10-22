import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Immutable from 'immutable';
import products from 'constants/products.json';

// import { dealNumber } from 'helpers/string';
// import find from 'lodash/find';
// import includes from 'lodash-es/includes';
// import format from 'date-fns/format';
// import Button from 'ui/button';

import imgStamp from './stamp.png';

import imgBlueCar from '../../zone/blueCar.png';

const Container = styled.div`
  background-color: white;
  margin-bottom: 0.1rem;
  line-height: 0.2rem;
  font-size: 0.14rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  background-image: url('${imgStamp}');
  background-position: top 0.8rem center;
  background-size: 1.7rem 1.75rem;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  padding: 0.1rem 0;
  color: ${props => (props.red ? '#E01053' : '#57D3F2')};
  border-bottom: 1px solid #dbdcdd;

  img {
    display: inline-block;
    margin: 0.03rem 0.1rem 0.03rem 0.2rem;
    width: 0.2rem;
    height: 0.14rem;
  }
`;

const Item = styled.p`
  border-bottom: 1px solid #dbdcdd;
  margin-left: 0.2rem;
  line-height: 0.5rem;
  color: #4a4a4a;

  &:last-of-type {
    border: none;
  }
`;

const Name = styled.span`
  font-size: 0.14rem;
  color: #818b96;
`;
const Content = styled.span`
  float: right;
  margin-right: 0.2rem;
`;

const CertItem = ({ carport, user }) => {
  const product = Immutable.fromJS(find(products, { id: carport.get('productId') }));
  if (carport.get('status') === 'unpaid') {
    return null;
  }
  console.log(product, carport.toJS(), user);
  return (
    <Container>
      <Title>
        <img src={imgBlueCar} alt="" />
        {carport.get('status') === 'virtual' ? '车位正在建设中' : carport.getIn(['zone', 'name'])}
      </Title>
      <Item>
        <Name>所有权证书持证人</Name>
        <Content>
          {user.get('name')} {user.get('IDCardNo')}
        </Content>
      </Item>
      <Item>
        <Name>所有权共有权人</Name>
        <Content>
          {carport.get('stock') === 1 && '众筹'}
          {carport.get('stock') === 5 && '合并持有'}
          {carport.get('stock') === 20 && '不适用'}
        </Content>
      </Item>
      <Item>
        <Name>持证人所占份额</Name>
        <Content>{carport.get('stock') * 5}%</Content>
      </Item>
      <Item>
        <Name>所有权证证号</Name>
        <Content>{carport.get('orderId')}</Content>
      </Item>
      <Item>
        <Name>车位坐落</Name>
        <Content>{carport.getIn(['zone', 'name'])}</Content>
      </Item>
    </Container>
  );
};

CertItem.propTypes = {
  carport: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default CertItem;
