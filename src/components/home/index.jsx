import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, YAxis } from 'recharts';
import styled from 'styled-components';
import { dealNumber } from 'helpers/string';

import imgBanner from './banner.jpg';
import IconBill from './bill.svg';
import IconRelation from './relation.svg';
import IconTransfer from './transfer.svg';

const Container = styled.div`user-select: none;`;

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
  padding-top: 0.1rem;
  margin-bottom: 0.1rem;
  background-color: white;
  p {
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.14rem;
    color: #4a4a4a;
  }
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
    <Container>
      <Head>
        <P1>昨日收益（元）</P1>
        <P2>{dealNumber(0)}</P2>
        <P3>总资产 {dealNumber(user.get('totalAssets'))} 元</P3>
        <P3>累计收益 {dealNumber(user.get('allowance') + user.get('fee'))} 元</P3>
        {/* <P3>入账收益 103232.00 元</P3> */}
      </Head>
      <SubHead>
        <div>
          <SubP1>昨日车位收益（元）</SubP1>
          <SubP4>{dealNumber(0)}</SubP4>
        </div>
        <div>
          <SubP1>昨日补贴收益（元）</SubP1>
          <SubP4>{dealNumber(0)}</SubP4>
        </div>
      </SubHead>
      <Graph>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            data={[
              {
                name: 'a',
                value: 110,
              },
              {
                name: 'b',
                value: 10,
              },
              {
                name: 'c',
                value: 70,
              },
              {
                name: 'd',
                value: -100,
              },
              {
                name: 'e',
                value: 110,
              },
              {
                name: 'f',
                value: 110,
              },
            ]}
          >
            <Line
              type="monotoneX"
              dataKey="value"
              stroke="#E01053"
              unit="%"
              label={{ fill: 'black', fontSize: 14 }}
            />
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            {/* <XAxis dataKey="name" /> */}
            <YAxis
              unit="%"
              minTickGap={5}
              interval="preserveStartEnd"
              domain={['dataMin - 20', 'dataMax + 20']}
            />
          </LineChart>
        </ResponsiveContainer>
        <p>七日年化收益率</p>
      </Graph>
      <Tools>
        <Tool onClick={() => history.push('/mine/records')}>
          <IconBill />
          <p>收支明细</p>
        </Tool>
        <Tool onClick={() => history.push('/mine/withdraw')}>
          <IconTransfer />
          <p>提现</p>
        </Tool>
        <Tool onClick={() => history.push('/mine/relations')}>
          <IconRelation />
          <p>客户关系</p>
        </Tool>
      </Tools>
      <Banner src={imgBanner} alt="" />
    </Container>
  );
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
};
