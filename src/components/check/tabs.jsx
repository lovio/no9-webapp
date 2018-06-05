import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import styled from 'styled-components';

import IconPhone from './phone.svg';
import IconAccount from './account.svg';

const Container = styled.div`
  height: 0.5rem;
  border-bottom: 1px solid #f6f6f6;
  display: flex;

  font-size: 0.14rem;
  line-height: 0.5rem;
`;

const Link = styled.p`
  text-align: center;
  width: 100%;
  color: ${props => (props.isActive ? '#0889FF' : '#4A4A4A')};
  background-color: ${props => props.isActive && 'white'};
  fill: ${props => (props.isActive ? '#0889FF' : '#4A4A4A')};

  svg {
    margin-right: 0.1rem;
    height: 0.14rem;
  }
`;

const Tabs = ({ pathname }) => (
  <Container>
    <Link
      isActive={pathname === '/grade'}
      onClick={() =>
        history.replace({
          pathname: '/grade',
        })
      }>
      <IconAccount />
      身份证号
    </Link>
    <Link
      isActive={pathname === '/grade/name'}
      onClick={() =>
        history.replace({
          pathname: '/grade/name',
        })
      }>
      <IconPhone />
      用户名 + 手机号
    </Link>
  </Container>
);

Tabs.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Tabs;
