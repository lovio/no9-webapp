import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const Company = styled.p`
  margin: 0.3rem 0 0.2rem;
  font-size: 0.12rem;
  color: #9b9b9b;
`;

const Intro = () => (
  <Container>
    {/* <BackToTop>回到顶部</BackToTop> */}
    <Company>版权所有 九路泊车云商（北京）科技有限公司</Company>
  </Container>
);
export default Intro;
