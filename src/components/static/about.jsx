import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import imgLogo from './logo.png';

const Container = styled.div`
  padding: 0.5rem;
  text-align: center;
`;
const Logo = styled.img`
  width: 2rem;
  margin-bottom: 0.3rem;
`;

const Title = styled.p`
  font-size: 0.14rem;
  line-height: 0.3rem;
  color: #4a4a4a;
  text-align: center;
`;

const Agreement = styled(Link)`
  line-height: 0.3rem;
  color: blue !important;
`;
const About = () => (
  <Container>
    <Logo src={imgLogo} />
    <Title>闪泊车云生态系统 V1.0.1</Title>
    <Title>Flash Park Cloud System V1.0.1</Title>
    <Title>九路泊车云商（北京）科技有限公司</Title>
    <Title>版权所有</Title>
    <Title>Jiu Road Cloud Service (Beijing) Limited</Title>
    <Title>All Rights Reserved</Title>
    <Agreement to="/agreement">用户协议</Agreement>
  </Container>
);

export default About;
