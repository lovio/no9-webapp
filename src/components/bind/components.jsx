import styled from 'styled-components';

import imgEmailBind from 'images/email-bind.png';
import imgLogoBind from 'images/logo-bind.png';

export const Container = styled.div`
  height: 100%;
`;

export const Desc = styled.div`
  text-align: center;
  height: 0.4rem;
  font-size: 0.12rem;
  line-height: 0.4rem;
  color: #2E3236;
  letter-spacing: 0;
`;

export const BtnContainer = styled.div`
  margin-top: 0.3rem;
  padding: 0 0.15rem;
`;

export const Ways = styled.div`
  margin: 0.66rem auto 0;
  width: 1.9rem;

  div:last-of-type {
    display: flex;
    justify-content: space-between;
  }
`;

export const WaysTitle = styled.div`
  display: flex;
  height: 0.17rem;
  margin-bottom: 0.23rem;

  span {
    width: 0.38rem;
    height: 0.08rem;
    box-sizing: content-box;
    border-bottom: 0.01rem solid #979797;
  }

  p {
    flex: 1;
    margin: 0;
    text-align: center;
    font-size: 0.12rem;
    color: #8F9DA5;
    line-height: 0.17rem;
  }
`;

export const BindWay = styled.span`
  margin: 0 auto;
  background-size: 0.4rem 0.4rem;
  background-repeat: no-repeat;
  background-position: top center;
  padding-top: 0.45rem;
  font-size: 0.12rem;
  color: #8F9DA5;
  line-height: 0.17rem;
  text-align: center;
`;

export const BindEmail = styled(BindWay) `
  background-image: url('${imgEmailBind}');
`;

export const BindAccount = styled(BindWay) `
  background-image: url('${imgLogoBind}');
`;

export const Contact = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.12rem;
  line-height: 0.24rem;
  color: #2E3236;
  text-align: center;

  a {
    color: #FE663B;
    text-decoration: none;
  }
`;
