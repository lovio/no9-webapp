import React from 'react';
import history from 'helpers/history';
import styled from 'styled-components';

import imgCar from './car.png';
import imgRelation from './relation.png';

const Container = styled.div`
  background-color: white;
  padding: 0.03rem 0 0.03rem 0.2rem;
  font-size: 0.18rem;
  color: #4a4a4a;
  margin-bottom: 0.1rem;
`;

const Item = styled.div`
  padding: 0.14rem 0;
  overflow: auto;
  line-height: 0.25rem;
  border-bottom: 1px solid #dbdcdd;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Icon = styled.span`
  display: inline-block;
  width: 0.46rem;
  text-align: center;
  img {
    display: inline-block;
    margin-top: 0.06rem;
    height: 0.14rem;
  }
`;

const Menu = () => (
  <div>
    <Container>
      <Item onClick={() => history.push('/mine/orders')}>
        <Icon>
          <img src={imgCar} alt="" />
        </Icon>
        我的订单
      </Item>
      <Item onClick={() => history.push('/mine/certs')}>
        <Icon>
          <img src={imgCar} alt="" />
        </Icon>
        车位电子所有权证书
      </Item>
      <Item onClick={() => history.push('/mine/profile')}>
        <Icon>
          <img src={imgCar} alt="" />
        </Icon>
        账户设置
      </Item>
      <Item onClick={() => history.push('/mine/profile')}>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        实名信息
      </Item>
      <Item onClick={() => history.push('/mine/relations')}>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        我的客户关系
      </Item>
      <Item onClick={() => history.push('/mine/invite')}>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        生成我的邀请码
      </Item>
    </Container>

    <Container>
      <Item onClick={() => history.push('/mine/records')}>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        收支明细
      </Item>
      <Item onClick={() => history.push('/mine/records?type=withdraw')}>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        提现记录
      </Item>
      <Item onClick={() => history.push('/mine/cards')}>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        提现设置
      </Item>
    </Container>
    <Container>
      <Item>
        <Icon>
          <img src={imgRelation} alt="" />
        </Icon>
        关于九路泊车
      </Item>
    </Container>
  </div>
);

export default Menu;
