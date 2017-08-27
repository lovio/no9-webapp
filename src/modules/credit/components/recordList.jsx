import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';

import Loading from 'ui/loading';
import imgCredits from 'images/credits.png';
import imgNoContent from 'images/no-content.png';
import Waypoint from 'react-waypoint';

export const Container = styled.div`
  margin-bottom: 0.15rem;
`;

export const Title = styled.div`
  position: relative;
  margin-top: 0.18rem;
  color: #8F9DA5;
  font-size: 0.12rem;
  text-align: center;
`;

export const TaskList = styled.div`
  padding-top: 0.08rem;
`;
export const Task = styled.div`
  position: relative;
  background-color: #fff;
  border-bottom: 1px solid #EAEFF2;
`;

export const TaskTitle = styled.div`
  font-size: 0.14rem;
  padding-top: 0.15rem;
  margin-left: 0.15rem;
  color: #2E3236;
`;

export const TaskTime = styled.div`
  font-size: 0.12rem;
  margin-top: 0.02rem;
  padding-bottom: 0.15rem;
  margin-left: 0.15rem;
  color: #8F9DA5;
`;

export const TaskCredits = styled.div`
  position: absolute;
  right: 0.15rem;
  top: 0.23rem;
  font-size: 0.14rem;

  img {
    width: 0.14rem;
    height: 0.14rem;
    margin-left: 0.04rem;
    vertical-align: -0.02rem;
  }
`;

export const NoContent = styled.div`
  height: 5rem;
  margin-top: 0.08rem;
  background-color: #fff;
  text-align: center;

  img {
    margin-top: 0.2rem;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const Tip = styled.div`
  margin-top: 0.1rem;
  color: #8F9DA5;
`;

// 需要重构，使用AutoLoader，目前为了赶进度，就这样实现好了
export default class RecordList extends Component {
  static propTypes = {
    records: PropTypes.object.isRequired,
    getCreditRecords: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
  }

  render() {
    const { records, pagination } = this.props;

    return (
      <Container>
        <Title>积分明细</Title>
        {
          !records.isEmpty() && (
            <TaskList>
              {
                records.map(item => (
                  <Task key={item.get('id')}>
                    <TaskTitle>{item.get('pointDescription')}</TaskTitle>
                    <TaskTime>{item.get('time')}</TaskTime>
                    <TaskCredits>
                      <span>+{item.get('point')}</span>
                      <Image src={imgCredits} alt="credits" />
                    </TaskCredits>
                  </Task>
                ))
              }
            </TaskList>
          )
        }
        {
          !pagination.get('isLoading') && pagination.get('hasMore') && (
            <Waypoint
              onEnter={() => {
                this.setState(prevState => ({
                  page: prevState.page + 1,
                }), () => {
                  this.props.getCreditRecords({ page: this.state.page - 1 });
                });
              }}
            />
          )
        }
        {
          pagination.get('isLoading') && (
            <Loading />
          )
        }
        {
          !pagination.get('isLoading') && !pagination.get('hasMore') && records.isEmpty() && (
            <NoContent>
              <Image src={imgNoContent} alt="no-content" />
              <Tip>暂无内容</Tip>
            </NoContent>
          )
        }
      </Container>
    );
  }
}
