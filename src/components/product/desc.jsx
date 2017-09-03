import React from 'react';
import styled from 'styled-components';

import imgCarport2 from './carport2.jpg';
import imgCarport3 from './carport3.jpg';
import imgCarport4 from './carport4.jpg';

const Container = styled.div`
  overflow: auto;
  padding-top: 0.2rem;
  background-color: white;
  line-height: 0.2rem;
  font-size: 0.14rem;
`;

const Title = styled.p`
  text-align: center;
  color: #e01053;
`;

const Desc1 = styled.p`
  color: #9b9b9b;
  padding: 0.1rem 0.2rem;
`;

const Feature = styled.div`border-bottom: 1px solid #f4f3f3;`;

const BlueSpan = styled.span`
  display: inline-block;
  width: 0.08rem;
  height: 0.25rem;
  float: left;
  background-color: #57d3f2;
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

const Image = styled.img`width: 100%;`;

const FeatureDesc = styled.p`
  padding: 0.12rem 0.2rem 0.06rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #4a4a4a;
`;

const Desc = () => (
  <Container>
    <Title>订购方式</Title>
    <Desc1>这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介</Desc1>
    <Feature>
      <BlueSpan />
      <FeatureTitle>产品特性</FeatureTitle>
      <Image src={imgCarport2} alt="carport" />
      <FeatureDesc>
        这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介
      </FeatureDesc>
    </Feature>
    <Feature>
      <BlueSpan />
      <FeatureTitle>产品特性</FeatureTitle>
      <Image src={imgCarport3} alt="carport" />
      <FeatureDesc>
        这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介
      </FeatureDesc>
    </Feature>
    <Feature>
      <BlueSpan />
      <FeatureTitle>产品特性</FeatureTitle>
      <Image src={imgCarport4} alt="carport" />
      <FeatureDesc>
        这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介这个停车位的简介
      </FeatureDesc>
    </Feature>
  </Container>
);

export default Desc;
