import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
import map from 'lodash/map';

import { Footer } from 'ui';
import imgProperty from './property.png';
import imgCarport from './carport.png';
import imgCart from './cart.png';
import imgMine from './mine.png';

const LINKS = [
  {
    url: '/',
    img: imgProperty,
    title: '资产',
  },
  {
    url: '/zones',
    img: imgCarport,
    title: '车位',
  },
  {
    url: '/products',
    img: imgCart,
    title: '购买',
  },
  {
    url: '/mine',
    img: imgMine,
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

  img {
    height: 0.14rem;
  }

  p {
    /* 资产: */
    line-height: 0.2rem;
    font-size: 0.14rem;
    margin: 0;
    letter-spacing: 0;
    /* 首页: */
    color: ${(props) => {
      if (props.isActive) {
        return '#E01053';
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
          }}
        >
          <img src={link.img} alt="property" />
          <p>{link.title}</p>
        </Tab>
      ))}
    </Footer>
  );
}

FooterView.propTypes = {
  location: PropTypes.object.isRequired,
};
