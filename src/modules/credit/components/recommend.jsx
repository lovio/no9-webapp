import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from 'ui';

import imgTaskShare from 'images/task-share.jpg';
import imgTaskWrite from 'images/task-write.jpg';
import ShareArrowView from 'components/common/share_arrow';

export const Title = styled.div`
  position: relative;
  margin-top: -0.06rem;
  color: #8F9DA5;
  font-size: 0.12rem;
  text-align: center;
`;

export const TaskGroup = styled.div`
  display: flex;
  padding-left: 0.15rem;
  padding-right: 0.15rem;

  a {
    display: block;
    flex: 1;
  }

  a:hover {
    text-decoration: none;
  }
`;

export const Task = styled.div`
  position: relative;
  flex: 1;
  height: 0.75rem;
  margin-top: 0.08rem;
  background-color: #fff;
  border: 1px solid #EAEFF2;
  border-radius: 0.03rem;

  &:first-child {
    margin-right: 0.07rem;
  }

  &:nth-child(2) {
    margin-left: 0.07rem;
  }

  img {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 0.32rem;
    height: 0.32rem;
  }
`;

export const TaskTitle = styled.div`
  font-size: 0.14rem;
  margin-top: 0.19rem;
  margin-left: 0.62rem;
  color: #2E3236;
`;

export const TaskCredits = styled.div`
  font-size: 0.12rem;
  margin-left: 0.62rem;
  color: #8F9DA5;
`;

export default class Recommend extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  showModal() {
    return () => {
      this.setState({
        isShowModal: true,
      });
    };
  }

  hideModal() {
    return () => {
      this.setState({
        isShowModal: false,
      });
    };
  }

  render() {
    return (
      <div>
        <Title>做任务得积分</Title>
        <TaskGroup>
          <Task onClick={this.showModal()}>
            <Image src={imgTaskShare} alt="share" />
            <TaskTitle>分享一次</TaskTitle>
            <TaskCredits>+5积分</TaskCredits>
          </Task>
          <Task>
            <Link to="/">
              <Image src={imgTaskWrite} alt="write" />
              <TaskTitle>做一道题</TaskTitle>
              <TaskCredits>+2积分</TaskCredits>
            </Link>
          </Task>
        </TaskGroup>

        {this.state.isShowModal && (
          <ShareArrowView
            title="我想邀请你一起刷分"
            desc="翟少成，林强，岳建辉，栾翔……80%的托福名师都在这！"
            hideModal={this.hideModal()}
          />
        )}
      </div>
    );
  }
}
