import React from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import styled from 'styled-components';
// date-fns
import setDay from 'date-fns/set_day';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import addDays from 'date-fns/add_days';
import getMonth from 'date-fns/get_month';

import range from 'lodash-es/range';
import map from 'lodash-es/map';

import { Image } from 'ui';
import imgArrow from 'images/arrow.png';
import imgCheckin from 'images/checkinCircle.png';

const Container = styled.div`
  background-color: white;
  border-bottom: 0.01rem solid #EAEFF2;
`;

const Navigator = styled.div`
  display: flex;
  box-sizing: content-box;
  height: 0.52rem;
  align-items: center;
  border-bottom: 0.01rem solid #EAEFF2;

  div:first-of-type, div:last-of-type {
    width: 0.59rem;
    height: 0.52rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.09rem;
      height: 0.15rem;
    }
  }

  div:nth-of-type(2) {
    flex: 1;
    text-align: center;
    font-size: 0.16rem;
    line-height: 0.52rem;
    color: #2E3236;
  }

  div:nth-of-type(1) {
    img {
      transform: rotate(0.5turn);
    }
  }
`;

const Body = styled.div`
  padding: 0 0.3rem 0.2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CellContainer = styled.div`
  width: 14%;
  text-align: center;
`;

const Cell = styled.div`
  display: inline-block;
  margin: 0;
  font-size: 0.14rem;
  color: ${(props) => {
    if (props.isToday) {
      return 'white';
    } else if (props.isDark) {
      return '#8F9DA5';
    }
    return '#2E3236';
  }};
  line-height: 0.36rem;
  width: 0.36rem;
  margin: 0.07rem 0;
  text-align: center;
  border-radius: 9999px;
  ${(props) => {
    if (props.isToday) {
      return `
        background-color: #FE663B;
      `;
    } else if (props.isCheckedIn) {
      return `
        background-position: center;
        background-size: 0.36rem 0.36rem;
        background-repeat: no-repeat;
        background-image: url('${imgCheckin}');
      `;
    }
    return '';
  }}
`;


const WEEK_NAME = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const prepareDays = createSelector(
  year => year,
  (year, month) => month,
  (year, month) => {
    // 这个月第一天所在的礼拜的第一天
    const firstDay = setDay(new Date(year, month, 1), 1);
    // 28天后如果还是这个月，那就需要5行来显示全部，如果是下个月了，说明这个月已经结束了, 4行就够了
    const line = getMonth(addDays(firstDay, 4 * 7)) > month ? 4 : 5;
    // 一周七天
    const arr = map(
      range(line * 7),
      (offset) => {
        const day = addDays(firstDay, offset);
        return {
          day: format(day, 'D'),
          year: format(day, 'YYYY'),
          month: format(day, 'M'),
          inThisMonth: getMonth(day) === month,
          isToday: isToday(day),
          value: format(day, 'YYYY-M-D'),
        };
      },
    );
    return arr;
  },
);

export default function Calendar(props) {
  const { year, month, goToLastMonth, goToNextMonth, checkins } = props;
  const days = prepareDays(year, month);
  return (
    <Container>
      <Navigator>
        <div onClick={() => goToLastMonth()}><Image src={imgArrow} alt="arrow" /></div>
        <div>{format(new Date(year, month), 'MMMM YYYY')}</div>
        <div onClick={() => goToNextMonth()}><Image src={imgArrow} alt="arrow" /></div>
      </Navigator>
      <Body>
        {
          WEEK_NAME.map(name => (
            <CellContainer key={name} >
              <Cell>{name}</Cell>
            </CellContainer>
          ))
        }
        {
          days.map(day => (
            <CellContainer key={day.value}>
              <Cell
                isDark={!day.inThisMonth}
                isToday={day.isToday}
                isCheckedIn={checkins.has(day.value)}
              >
                {day.day}
              </Cell>
            </CellContainer>
          ))
        }
      </Body>
    </Container>
  );
}

Calendar.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  goToNextMonth: PropTypes.func.isRequired,
  goToLastMonth: PropTypes.func.isRequired,
  checkins: PropTypes.object.isRequired,
};
