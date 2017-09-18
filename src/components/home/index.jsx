import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import imgBanner from './banner.jpg';
import IconBill from './bill.svg';
import IconRelation from './relation.svg';
import IconTransfer from './transfer.svg';

const Head = styled.div`
  padding: 0.15rem 0;
  background-color: #e01053;
  color: white;
`;

const P1 = styled.p`
  text-align: center;
  font-size: 0.12rem;
  line-height: 0.2rem;
  color: rgba(219, 220, 221, 1);
`;

const P2 = styled.p`
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.36rem;
`;

const P3 = styled.p`
  text-align: center;
  font-size: 0.14rem;
  line-height: 0.2rem;
`;

const P4 = styled.p`
  text-align: center;
  font-size: 0.18rem;
  line-height: 0.25rem;
  color: white;
`;

const Graph = styled.div`
  margin-bottom: 0.1rem;
  background-color: white;
  height: 1.5rem;
`;

const Tools = styled.div`
  margin-bottom: 0.1rem;
  background-color: white;
  display: flex;
`;

const Tool = styled.div`
  padding: 0.15rem 0 0.1rem;
  text-align: center;
  flex: 1;
  svg {
    width: 0.54rem;
    height: 0.54rem;
  }

  p {
    margin-top: 0.1rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    color: #4a4a4a;
  }
`;

const Banner = styled.img`width: 100%;`;

const SubP1 = styled(P1)`margin-top: 0.1rem;`;
const SubP4 = styled(P4)`margin-bottom: 0.15rem;`;

const SubHead = styled.div`
  background-color: #ee2062;
  display: flex;

  /* 注册: */
  font-family: .AppleSystemUIFont;
  font-size: 0.14rem;
  line-height: 0.4rem;
  div {
    flex: 1;
    border-right: 1px solid white;
  }

  div:last-of-type {
    border: none;
  }
`;

export default function HomeView({ user }) {
  return (
    <div>
      <Head>
        <P1>昨日收益（元）</P1>
        <P2>299.88</P2>
        <P3>总资产 {user.get('balance')} 元</P3>
        <P3>累计收益 103232.00 元</P3>
        <P3>入账收益 103232.00 元</P3>
      </Head>
      <SubHead>
        <div>
          <SubP1>昨日车位收益（元）</SubP1>
          <SubP4>130.22</SubP4>
        </div>
        <div>
          <SubP1>昨日补贴收益（元）</SubP1>
          <SubP4>1300.22</SubP4>
        </div>
      </SubHead>
      <Graph>这里是Graph</Graph>
      <Tools>
        <Tool>
          <IconBill />
          <p>收支明细</p>
        </Tool>
        <Tool>
          <IconTransfer />
          <p>转账</p>
        </Tool>
        <Tool>
          <IconRelation />
          <p>客户关系</p>
        </Tool>
      </Tools>
      <Banner src={imgBanner} alt="" />
    </div>
  );
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
};
