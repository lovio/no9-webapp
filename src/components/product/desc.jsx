import React from 'react';
import styled from 'styled-components';

import IncomeCal from './incomeCal';

import imgProfits from './profits.jpg';

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
const Image = styled.img`width: 2.2rem;`;

const Desc = () => (
  <Container>
    <Title>收益方式</Title>
    <TitleDesc>九路云商车位地产收益主要由三种方式构成，即：停车费收入、代理销售收入、车位增值收益三种方式。</TitleDesc>
    {/* <Feature>
      <BlueSpan />
      <FeatureTitle>停车费收入</FeatureTitle>
      <Image src={imgHuaiBei} alt="carport" />
      <Content></Content>
      <FeatureDesc>
        淮北首个垂直循环式智能立体停车库（惠泽停车场）基本建成， 预计8月底投入试运营。据了解，惠泽停车场位于原市第二高级职业中学校园内，
        总占地面积约2000平方米，由两排面对面共28组七层288个车位的垂直循环式智能立体车库组成， 停车数量比地面普通停车场增加3至4倍，投入运营后将进一步缓解周边社区停车难问题。
      </FeatureDesc>
    </Feature> */}
    <Feature>
      <BlueSpan />
      <FeatureTitle>代理销售收入</FeatureTitle>

      <Content>
        <Image src={imgProfits} alt="carport" />
        <IncomeCal />
      </Content>
      {/* <FeatureDesc>
        九路泊车公司按照韩国DMIC公司客户要求推出一款10车位SUV型垂直循环式立体车库， 此款车库外观设计独特，寓意深长，该车库主体颜色采用“西瓜红”是一种甜甜的带有柔软特性的色彩。
        这种红在炎炎夏日中透出清凉，吊臂采用中国特有的“工程黄”，载车盘采用银色象征着财源滚滚 。“中国制造，2025”强有力的印在主机架上，代表着“中国制造，走出国门，走向世界”。
      </FeatureDesc> */}
    </Feature>
    {/* <Feature>
      <BlueSpan />
      <FeatureTitle>大丰住建局项目</FeatureTitle>
      <Image src={imgDaFeng} alt="carport" />
      <FeatureDesc>
        大丰位于江苏沿海中部，是国务院批复的长三角城市群规划中苏北唯一城市盐城的临海新城区， 也是江苏省面积最大的城市区。大丰区人大主任提出大丰区应该有规划地在一些区域建设一些立体停车场，
        以解决或缓和目前停车难的问题，在汽车保有量飞速增加和土地价格大幅攀升的今天，采用机械形式提高单位面积的停车数量，
        实现“立体停车”，是既节约土地又解决“停车难”问题的有效途径，今后应当多建设人民医院这种智能立体停车场，方便市民出行。
      </FeatureDesc>
    </Feature> */}
  </Container>
);

export default Desc;
