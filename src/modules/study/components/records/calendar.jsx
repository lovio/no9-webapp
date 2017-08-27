import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'react-hammerjs';
import styled from 'styled-components';
import history from 'helpers/history';
import setDay from 'date-fns/set_day';
import format from 'date-fns/format';
import getDay from 'date-fns/get_day';

import range from 'lodash-es/range';

const Container = styled.div`
  margin-top: 0.1rem;
  background-color: #FFF;
  border-bottom: 0.01rem solid #EAEFF2;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
`;

const Item = styled.div`
  display: inline-block;
  padding: 0.05rem 0 0.14rem;
  width: 0.54rem;
  text-align: center;
  letter-spacing: 0;

  p:first-of-type {
    font-size: 0.12rem;
    color: #8F9DA5;
    line-height: 0.33rem;
  }

  p:last-of-type {
    font-size: 0.14rem;
    line-height: 0.3rem;
    width: 0.3rem;
    display: inline-block;
    border-radius: 9999px;
    ${
      (props) => {
        if (props.isOn) {
          return `
            background-color: #FE663B;
            color: #FFF;
          `;
        }
        return 'color: #2E3236;';
      }
    }
  }
`;

const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const DAY_LENGTH = 7;
let prev = 0;

const get7Days = (start) => {
  const days = range(start, start + DAY_LENGTH).map((num) => {
    const day = setDay(Date.now(), num);
    return {
      day,
      dStr: format(day, 'YYYY-MM-DD'),
      format: format(day, 'D'),
      dayOfWeek: dayOfWeek[getDay(day)],
    };
  });
  return days;
};

export default class Calendar extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    prev = 0;
    this.state = {
      dates: get7Days(0),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const element = document.getElementById(this.props.date);
      if (element) {
        element.scrollIntoView();
      }
    }, 500);
  }

  handerSwipe = ({ direction }) => {
    // 4左，2右
    prev = direction === 4 ? prev - DAY_LENGTH : prev + DAY_LENGTH;
    this.setState({
      dates: get7Days(prev),
    });
  }

  render() {
    const { date } = this.props;
    return (
      <Hammer onSwipe={this.handerSwipe}>
        <Container>
          {
            this.state.dates.map(d => (
              <Item
                id={d.dStr}
                key={+d.day}
                onClick={() => history.replace(`/study/records?date=${d.dStr}`)}
                isOn={date === d.dStr}
              >
                <p>{d.dayOfWeek}</p>
                <p>{d.format}</p>
              </Item>
            ))
          }
        </Container>
      </Hammer>
    );
  }
}
