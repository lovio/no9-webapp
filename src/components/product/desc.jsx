import React from 'react';
import styled from 'styled-components';

import IncomeCal from './incomeCal';

import imgProfits from './profits.png';
import imgBJ1 from './bj1.jpg';
import imgXM1 from './xm1.jpg';
import imgSH1 from './sh1.jpg';
import imgBJ2 from './bj2.jpg';
import imgXM2 from './xm2.jpg';
import imgSH2 from './sh2.jpg';

const Container = styled.div`
  padding-bottom: 0.1rem;
  overflow: auto;
  background-color: white;
  line-height: 0.2rem;
  font-size: 0.14rem;
`;

const Title = styled.p`
  padding-top: 0.2rem;
  text-align: center;
  color: #0889ff;
  font-size: 0.18rem;
  line-height: 0.2rem;
`;

const TitleDesc = styled.p`
  padding: 0.14rem 0.2rem 0.2rem;
  font-size: 0.14rem;
  color: #999999;
  line-height: 0.18rem;
  border-bottom: 1px solid #f4f3f3;
`;

const Feature = styled.div`
  border-bottom: 1px solid #f4f3f3;
  overflow: auto;
  &:last-of-type {
    border: none;
  }
`;

const BlueSpan = styled.span`
  display: inline-block;
  width: 0.08rem;
  height: 0.25rem;
  float: left;
  background-color: #0889ff;
  margin: 0.1rem 0;
`;

const FeatureTitle = styled.p`
  float: left;
  margin: 0.1rem 0;
  padding-left: 0.2rem;
  font-size: 0.18rem;
  line-height: 0.25rem;
  color: #4a4a4a;
`;

const Content = styled.p`
  padding-top: 0.5rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #4a4a4a;
  text-align: center;
`;

const ContentImage = styled.p`
  img {
    width: 2.2rem;
  }
`;

// =======================================
const Card = styled.div`
  margin: 0 0.2rem 0.15rem;
  border: 1px solid #e7e7e7;
  display: flex;
  height: 1.58rem;

  font-size: 0.14rem;
  color: #999999;
`;

const CardImage = styled.div`
  position: relative;
  /* transform: translate3d(0, 0, 0); */
  img {
    width: 1.15rem;
    height: 1.56rem;
  }
  p {
    background-color: rgba(255, 255, 255, 0.75);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 0.35rem;

    font-size: 0.14rem;
    color: #666666;
  }
`;

const CardKey = styled.div`
  border-right: 1px solid #e7e7e7;
  display: flex;
  flex-direction: column;
  width: 0.9rem;

  &:last-of-type {
    border: none;
    flex: 1;
  }

  p {
    width: 100%;
    padding-right: 0.1rem;
    text-align: right;
  }
`;

const CardKeyItem = styled.div`
  border-bottom: 1px solid #e7e7e7;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:last-of-type {
    border: none;
  }
`;

const CardValueItem = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;

  p {
    width: 100%;
    padding-right: 0.1rem;
    text-align: right;
  }
`;

const Tip = styled.p`
  padding: 0 0.2rem;
  font-size: 0.14rem;
  color: #999999;
`;

const Desc = () => (
  <Container>
    <Title>收益方式</Title>
    <TitleDesc>九路云商车位地产收益主要由三种方式构成，即：停车费收入、代理销售收入、车位增值收益三种方式。</TitleDesc>
    <Feature>
      <BlueSpan />
      <FeatureTitle>停车费收入</FeatureTitle>
      <Content>
        <Card>
          <CardImage>
            <img src={imgBJ1} alt="carport" />
            <p>北京</p>
          </CardImage>
          <CardKey>
            <CardKeyItem>租金价格</CardKeyItem>
            <CardKeyItem>临停价格</CardKeyItem>
          </CardKey>
          <CardKey>
            <CardKeyItem>
              <CardValueItem>
                <p>地上1800元/月</p>
              </CardValueItem>
              <CardValueItem>
                <p>地下1300元/月</p>
              </CardValueItem>
              <CardValueItem>
                <p>机械1000元/月</p>
              </CardValueItem>
            </CardKeyItem>
            <CardKeyItem>
              <CardValueItem>
                <p>地上10元/小时</p>
              </CardValueItem>
              <CardValueItem>
                <p>地下8元/小时</p>
              </CardValueItem>
              <CardValueItem>
                <p>夜晚1元/2小时</p>
              </CardValueItem>
            </CardKeyItem>
          </CardKey>
        </Card>
        <Card>
          <CardImage>
            <img src={imgXM1} alt="carport" />
            <p>厦门</p>
          </CardImage>
          <CardKey>
            <CardKeyItem>租金价格</CardKeyItem>
            <CardKeyItem>临停价格</CardKeyItem>
          </CardKey>
          <CardKey>
            <CardKeyItem>
              <CardValueItem>
                <p>地上1500元/月</p>
              </CardValueItem>
              <CardValueItem>
                <p>地下1000元/月</p>
              </CardValueItem>
              <CardValueItem>
                <p>机械800元/月</p>
              </CardValueItem>
            </CardKeyItem>
            <CardKeyItem>
              <CardValueItem>
                <p>地上15元/小时</p>
              </CardValueItem>
              <CardValueItem>
                <p>地下6元/小时</p>
              </CardValueItem>
              <CardValueItem>
                <p>夜晚6元/小时</p>
              </CardValueItem>
            </CardKeyItem>
          </CardKey>
        </Card>
        <Card>
          <CardImage>
            <img src={imgSH1} alt="carport" />
            <p>上海</p>
          </CardImage>
          <CardKey>
            <CardKeyItem>租金价格</CardKeyItem>
            <CardKeyItem>临停价格</CardKeyItem>
          </CardKey>
          <CardKey>
            <CardKeyItem>
              <CardValueItem>
                <p>地上1600/月</p>
              </CardValueItem>
              <CardValueItem>
                <p>地下1200/月</p>
              </CardValueItem>
              <CardValueItem>
                <p>机械1000/月</p>
              </CardValueItem>
            </CardKeyItem>
            <CardKeyItem>
              <CardValueItem>
                <p>地上8元/小时</p>
              </CardValueItem>
              <CardValueItem>
                <p>地下6元/小时</p>
              </CardValueItem>
              <CardValueItem>
                <p>夜晚1元/2小时</p>
              </CardValueItem>
            </CardKeyItem>
          </CardKey>
        </Card>
      </Content>
    </Feature>
    <Feature>
      <BlueSpan />
      <FeatureTitle>代理销售收入</FeatureTitle>
      <Content>
        {/* <ContentImage> */}
        <img src={imgProfits} width="100%" alt="carport" />
        {/* </ContentImage> */}
        {/* <IncomeCal /> */}
      </Content>
    </Feature>
    <Feature>
      <BlueSpan />
      <FeatureTitle>车位增值收益</FeatureTitle>
      <Content>
        <Card>
          <CardImage>
            <img src={imgBJ2} alt="carport" />
            <p>北京</p>
          </CardImage>
          <CardKey>
            <CardKeyItem>最高价格</CardKeyItem>
            <CardKeyItem>最低价格</CardKeyItem>
            <CardKeyItem>价格趋势</CardKeyItem>
            <CardKeyItem>采集时间</CardKeyItem>
          </CardKey>
          <CardKey>
            <CardKeyItem>
              <p>78万元</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>25万元</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>连续9年上涨</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>2017年10月11日</p>
            </CardKeyItem>
          </CardKey>
        </Card>
        <Card>
          <CardImage>
            <img src={imgXM2} alt="carport" />
            <p>厦门</p>
          </CardImage>
          <CardKey>
            <CardKeyItem>最高价格</CardKeyItem>
            <CardKeyItem>最低价格</CardKeyItem>
            <CardKeyItem>价格趋势</CardKeyItem>
            <CardKeyItem>采集时间</CardKeyItem>
          </CardKey>
          <CardKey>
            <CardKeyItem>
              <p>70万元</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>28.2万元</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>连续4年上涨</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>2017年10月11日</p>
            </CardKeyItem>
          </CardKey>
        </Card>
        <Card>
          <CardImage>
            <img src={imgSH2} alt="carport" />
            <p>上海</p>
          </CardImage>
          <CardKey>
            <CardKeyItem>最高价格</CardKeyItem>
            <CardKeyItem>最低价格</CardKeyItem>
            <CardKeyItem>价格趋势</CardKeyItem>
            <CardKeyItem>采集时间</CardKeyItem>
          </CardKey>
          <CardKey>
            <CardKeyItem>
              <p>110万元</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>18.75万元</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>连续7年上涨</p>
            </CardKeyItem>
            <CardKeyItem>
              <p>2017年10月11日</p>
            </CardKeyItem>
          </CardKey>
        </Card>
      </Content>
    </Feature>
    <Tip>＊ 数据来源：网络</Tip>
  </Container>
);

export default Desc;
