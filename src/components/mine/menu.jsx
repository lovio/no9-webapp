import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import IconRecord from 'images/record.svg';
import IconCredits from 'images/credits.svg';
import IconMedal from 'images/medal.svg';
// import IconSeat from 'images/seat.svg';
import IconProfile from 'images/id-card.svg';

import imgArrow from 'images/arrow.png';

import { log } from 'helpers/logger';

const Container = styled.div`
  margin-top: 0.1rem;
  background-color: #FFF;

  a {
    display: flex;
    text-decoration: none;
    padding-left: 0.15rem;
    align-items: center;
    border-bottom: 0.01rem solid #EAEFF2;
    background-image: url('${imgArrow}');
    background-position: right 0.15rem center;
    background-repeat: no-repeat;
    background-size: 0.06rem 0.09rem;

    svg {
      width: 0.16rem;
      height: 100%;
    }

    span {
      padding-left: 0.15rem;
      line-height: 0.44rem;
      font-size: 0.14rem;
      color: #2E3236;
      flex: 1;
    }
  }
`;

export default function Menu() {
  return (
    <Container>
      <Link to="/study/records" onClick={() => log({ eventDetail: 'PERSONAL_EXCERCISERECORD' })} >
        <IconRecord />
        <span>我的练习记录</span>
      </Link>
      <Link to="/credit" onClick={() => log({ eventDetail: 'PERSONAL_CREDIT' })} >
        <IconCredits />
        <span>我的积分</span>
      </Link>
      <Link to="/medal" onClick={() => log({ eventDetail: 'PERSONAL_MEDAL' })} >
        <IconMedal />
        <span>我的成就</span>
      </Link>
      {/* <Link to="/" onClick={() => log({ eventDetail: 'PERSONAL_PLACE' })} >
        <IconSeat />
        <span>我的考位</span>
      </Link> */}
      <Link to="/user" onClick={() => log({ eventDetail: 'PERSONAL_INFORMATION' })} >
        <IconProfile />
        <span>我的资料</span>
      </Link>
    </Container>
  );
}
