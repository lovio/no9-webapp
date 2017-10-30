import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
import map from 'lodash-es/map';

import { Footer } from 'ui';
import IconProperty from './property.svg';
import IconCart from './cart.svg';
import IconMine from './mine.svg';
import IconCarport from './carport.svg';

const LINKS = [
  {
    url: '/',
    Icon: () => <IconProperty />,
    title: '资产',
  },
  {
    url: '/zones',
    Icon: () => <IconCarport />,
    title: '车位',
  },
  {
    url: '/products',
    Icon: () => <IconCart />,
    title: '购买',
  },
  {
    url: '/mine',
    Icon: () => <IconMine />,
    title: '账户',
  },
];

const Tab = styled.div`
  width: 100%;
  text-align: center;

  display: block;
  text-decoration: none;
  // 还有border-top的0.01rem
  margin: 0.07rem 0 0.04rem;
  border-right: 1px solid #dbdcdd;

  svg {
    height: 0.14rem;
    fill: black;
    ${props => props.isActive && 'fill: #0889FF;'};
  }

  p {
    /* 资产: */
    line-height: 0.2rem;
    font-size: 0.14rem;
    margin: 0;
    letter-spacing: 0;
    /* 首页: */
    color: ${props => {
      if (props.isActive) {
        return '#0889FF';
      }
      return '#4A4A4A';
    }};
  }

  &:last-of-type {
    border-right: none;
  }
`;

export default function FooterView({ location: { pathname } }) {
  return (
    <Footer>
      {map(LINKS, link => (
        <Tab
          key={link.url}
          isActive={pathname === link.url}
          onClick={() => {
            if (link.url !== history.location.pathname) {
              history.push(link.url);
            }
          }}>
          {link.Icon()}
          <p>{link.title}</p>
        </Tab>
      ))}
    </Footer>
  );
}

FooterView.propTypes = {
  location: PropTypes.object.isRequired,
};
