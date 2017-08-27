import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import IconAsk from 'images/ask.svg';
import IconHome from 'images/home.svg';
import IconMine from 'images/mine.svg';
import IconHomeActive from 'images/homeActive.svg';
import IconMineActive from 'images/mineActive.svg';
import { Footer } from 'ui';
import { showPanel } from 'helpers/meiqia';

import { log } from 'helpers/logger';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  border-top: 0.01rem solid #EAEFF2;
`;

const Tab = styled.div`
  width: 100%;
  text-align: center;

  a {
    display: block;
    text-decoration: none;
    padding-top: 0.08rem;

    svg {
      width: 0.2rem;
      height: 0.2rem;
    }

    p {
      margin: 0;
      /* 首页: */
      font-size: 0.1rem;
      color: ${(props) => {
        if (props.isActive) {
          return '#FE663B';
        }
        return '#2E3236';
      }};
      letter-spacing: 0;
    }
  }
`;

export default function FooterView({ location: { pathname } }) {
  return (
    <Footer>
      <Container>
        <Tab
          isActive={pathname === '/'}
          onClick={() => log({ eventDetail: 'BOTTOM_HOME' })}
        >
          <Link to="/">
            { pathname === '/' && <IconHomeActive /> }
            { pathname !== '/' && <IconHome /> }
            <p>首页</p>
          </Link>
        </Tab>
        <Tab
          onClick={() => {
            log({ eventDetail: 'BOTTOM_CS' });
            showPanel();
          }}
        >
          <a>
            <IconAsk />
            <p>问问老师</p>
          </a>
        </Tab>
        <Tab
          isActive={pathname === '/mine'}
          onClick={() => log({ eventDetail: 'BOTTOM_PERSONAL' })}
        >
          <Link to="/mine">
            {pathname === '/mine' && <IconMineActive /> }
            {pathname !== '/mine' && <IconMine /> }
            <p>我的</p>
          </Link>
        </Tab>
      </Container>
    </Footer>
  );
}

FooterView.propTypes = {
  location: PropTypes.object.isRequired,
};
