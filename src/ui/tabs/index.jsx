import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import imgTabBar from './tab-bar.jpg';

const Container = styled.div`
  background: #ffffff;
  height: 0.44rem;
  box-sizing: content-box;
  border-bottom: 0.01rem solid #eaeff2;
`;

export const TabContainer = Container.extend`
  ${(props) => {
    if (props.type === 'overflow') {
      return `
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          white-space: nowrap;

          &::-webkit-scrollbar {
            display: none;
          }

          div {
            display: inline-block;
            min-width: 0.7rem;
          }
        `;
    }
    return `
        display: flex;
        justify-content: space-around;
      `;
  }};
`;

const Link = styled.div`
  padding: 0.04rem 0.15rem;
  font-size: 0.14rem;
  line-height: 0.36rem;
  color: ${(props) => {
    if (props.active) {
      return '#2E3236';
    }
    return '#8F9DA5';
  }};
  letter-spacing: 0;
  text-align: center;
  ${(props) => {
    if (props.active) {
      return `
      background-image: url('${imgTabBar}');
      background-repeat: no-repeat;
      background-size: 0.2rem 0.04rem;
      background-position: bottom;
      `;
    }
    return '';
  }};
`;

export function Tab({ name, ...rest }) {
  return <Link {...rest}>{name}</Link>;
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
};
