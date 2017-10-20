import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { dealNumber } from 'helpers/string';

const Container = styled.div`
  padding: 0.1rem 0.2rem;
  border-bottom: 1px solid #979797;
  color: #4a4a4a;
  font-size: 0.14rem;
  line-height: 0.2rem;
  background-color: white;
`;

const Item = styled.p`
  font-size: 0.12rem;
  color: #4a4a4a;
  line-height: 0.2rem;
`;

const Summary = ({ user }) => (
  <Container>
    <Item>累计补贴收益：￥{dealNumber(user.get('allowance'))}</Item>
    <Item>累计停车费收益：￥{dealNumber(user.get('fee'))}</Item>
    <Item>累计提现金额：￥{dealNumber(user.get('withdraw'))}</Item>
  </Container>
);

Summary.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Summary;
