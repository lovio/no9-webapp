import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, YAxis } from 'recharts';
import styled from 'styled-components';
import { dealNumber } from 'helpers/string';

import imgBanner from './banner.jpg';
import ImgBill from './bill.png';
import ImgRelation from './relation.png';
import ImgTransfer from './transfer.png';

const Container = styled.div`
  & > * {
    user-select: none;
  }
`;

const Head = styled.div`
  padding: 0.15rem 0 0;
  color: white;

  /* Rectangle: */
  background-image: linear-gradient(0deg, #3db4ff 0%, #0889ff 100%);
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

  &:last-of-type {
    margin-bottom: 0.2rem;
  }
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
  img {
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

const SubP1 = styled(P1)`margin-top: 0.12rem;`;
const SubP4 = styled(P4)`margin-bottom: 0.1rem;`;

const SubHead = styled.div`
  background: #0e83ef;
  display: flex;

  font-size: 0.14rem;
  line-height: 0.4rem;
  div {
    flex: 1;
    border-right: 1px solid rgba(255, 255, 255, 0.4);
  }

  div:last-of-type {
    border: none;
  }
`;

export default function HomeView({ user, summaries }) {
  const fee = summaries.getIn([0, 'fee']) || 0;
  const allowance = summaries.getIn([0, 'allowance']) || 0;
  console.log(fee, allowance);
  console.log(summaries);
  return (
    <Container>
      <Head>
        <P1>昨日收益（元）</P1>
        <P2>{dealNumber(fee + allowance)}</P2>
        <P3>总资产 {dealNumber(user.get('totalAssets'))} 元</P3>
        <P3>累计收益 {dealNumber(user.get('allowance') + user.get('fee'))} 元</P3>
        {/* <P3>入账收益 103232.00 元</P3> */}
        <SubHead>
          <div>
            <SubP1>昨日车位收益（元）</SubP1>
            <SubP4>{dealNumber(fee)}</SubP4>
          </div>
          <div>
            <SubP1>昨日补贴收益（元）</SubP1>
            <SubP4>{dealNumber(allowance)}</SubP4>
          </div>
        </SubHead>
      </Head>

      {!!summaries.size && (
        <Graph>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              data={[0, 1, 2, 3, 4, 5].map(num => ({
                name: num,
                value: summaries.getIn([num, 'rate']) || 0,
              }))}
            >
              <Line
                type="monotoneX"
                dataKey="value"
                stroke="#0e83ef"
                unit="%"
                label={{ fill: 'black', fontSize: 14 }}
              />
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              {/* <XAxis dataKey="name" /> */}
              <YAxis
                unit="%"
                minTickGap={5}
                interval="preserveStartEnd"
                domain={['dataMin', 'dataMax']}
              />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ color: '#0e83ef' }}>七日年化收益率</p>
        </Graph>
      )}

      <Tools>
        <Tool onClick={() => history.push('/mine/records')}>
          <img src={ImgBill} alt="" />
          <p>收支明细</p>
        </Tool>
        <Tool onClick={() => history.push('/mine/withdraw')}>
          <img src={ImgTransfer} alt="" />

          <p>提现</p>
        </Tool>
        <Tool onClick={() => history.push('/mine/relations')}>
          <img src={ImgRelation} alt="" />
          <p>客户关系</p>
        </Tool>
      </Tools>
      <Banner src={imgBanner} alt="" />
    </Container>
  );
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  summaries: PropTypes.object.isRequired,
};
