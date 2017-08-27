import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { log } from 'helpers/logger';
import { Link } from 'react-router-dom';

import imgBgCredit from 'images/bg-credit.jpg';

export const Container = styled.div`
  position: relative;
  height: 1.8rem;
  color: #fff;
  background-image: url('${imgBgCredit}');
  background-position: center;
  background-size: 3.75rem 1.8rem;
  background-repeat: no-repeat;
`;

export const Credit = styled.div`
  padding-top: 0.2rem;
  font-size: 0.48rem;
  text-align: center;
  text-shadow: 0 0.01rem 0.1rem #DB4217;
  font-family: 'DIN Condensed';
`;

export const Tip = styled.div`
  font-size: 0.12rem;
  text-align: center;
  margin-top: -0.06rem;
`;

export const Rule = styled.div`
  position: absolute;
  top: 0.12rem;
  right: 0.14rem;
  font-size: 0.12rem;
  opacity: .7;

  a {
    text-decoration: none;
    color: inherit;
  }

  a:visited {
    color: inherit;
    text-decoration: none;
  }

  span:first-of-type {
    display: inline-block;
    width: 0.13rem;
    height: 0.13rem;
    margin-right: 0.04rem;
    font-size: 0.1rem;
    background-color: rgba(255,255,255,.7);
    border-radius: 1rem;
    text-align: center;
    color: #FE663B;
    vertical-align: middle;
  }

  span:nth-of-type(2) {
    vertical-align: middle;
  }
`;

const getRank = (credit) => {
  let rank;

  if (credit >= 0 && credit <= 50) {
    rank = (credit / 50) * 20;
  }

  if (credit > 50 && credit <= 100) {
    rank = 20 + (((credit - 50) / 50) * 30);
  }

  if (credit > 100 && credit <= 200) {
    rank = 50 + (((credit - 100) / 100) * 30);
  }

  if (credit > 200 && credit <= 300) {
    rank = 80 + (((credit - 200) / 100) * 19);
  }

  if (credit > 300) {
    rank = 99;
  }

  return parseInt(rank, 10);
};

export default class Header extends Component {
  static propTypes = {
    credit: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Credit>{this.props.credit}</Credit>
        <Tip>超过{getRank(this.props.credit)}%的小伙伴，继续加油</Tip>
        <Rule>
          <Link
            to="/credit/rule"
            onClick={() => log({ eventDetail: 'PERSONAL_CREDIT_RULE' })}
          >
            <span>?</span>
            <span>积分规则</span>
          </Link>
        </Rule>
      </Container>
    );
  }
}
