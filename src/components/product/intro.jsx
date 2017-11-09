import React from 'react';
import styled from 'styled-components';
import { PRODUCT_NAME } from 'constants/constants.json';

const Container = styled.div`
  overflow: auto;
  background-color: white;
  padding: 0.05rem 0 0.3rem 0.2rem;
  border-bottom: 1px solid #dbdcdd;
`;

const Title = styled.p`
  /* 垂直循环智能立体停车位: */
  line-height: 0.32rem;
  font-size: 0.18rem;
  color: #4a4a4a;
`;

const Company = styled.span`
  background: #d8d8d8;
  font-size: 0.12rem;
  color: #ffffff;
`;

const Desc = styled.p`
  border-top: 1px solid #f4f3f3;
  margin-top: 0.1rem;
  padding-top: 0.1rem;
  margin-right: 0.2rem;
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.18rem;
`;

// const ReadMore = styled.span`
//   line-height: 0.2rem;
//   font-size: 0.14rem;
//   color: #e01053;
//   float: right;
//   margin-right: 0.2rem;
// `;

const Intro = () => (
  <Container>
    <Title>{PRODUCT_NAME}</Title>
    <Company>运营商：九路泊车云商（北京）科技有限公司</Company>
    <Desc>
      此车位性质为预售性质的委托管理式垂直循环智能立体停车位。持有人购买停车位后，委托九路云商进行管理，收取停车费，并向持有人进行分配。
    </Desc>
    {/* <ReadMore>更多介绍</ReadMore> */}
  </Container>
);

export default Intro;
