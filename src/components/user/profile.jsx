import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';
import imgArrow from 'images/arrow.png';
import history from 'helpers/history';

import Avatar from 'ui/avatar';

const Container = styled.div`
  background-color: #FFF;
  margin-bottom: 0.06rem;
`;

const Item = styled.div`
  box-sizing: content-box;
  border-bottom: 0.01rem solid #EAEFF2;
  display: flex;
  align-items: center;
  padding: 0.15rem;

  p {
    flex: 1;
    margin: 0;
    /* TPO2 口语 Q1: */
    font-size: 0.14rem;
    color: #2E3236;
    padding: 0;
    line-height: 0.15rem;
  }

  span {
    font-size: 0.14rem;
    line-height: 0.15rem;
    color: #8F9DA5;
  }

  img:last-of-type {
    margin-left: 0.1rem;
    width: 0.06rem;
    height: 0.09rem;
  }
`;

const Input = styled.input`
  display: inline-block;
  width: 100%;
  flex: 1;
  outline: none;
  border: none;
  font-size: 0.14rem;
  line-height: 0.15rem;
  color: #8F9DA5;
  text-align: right;
  &:focus {
    outline: none;
  }
`;

export default class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    uploadAvatar: PropTypes.func.isRequired,
    abroadPlan: PropTypes.object.isRequired,
    changeName: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.userInfo.get('nickname'),
      isChangingName: false,
    };
  }

  changeName = (e) => {
    if (!this.state.isChangingName) {
      const value = e.target.value;
      this.setState(() => ({
        name: value,
        isChangingName: false,
      }));
    }
  }

  updateName = () => {
    const { isChangingName, name } = this.state;
    const { userInfo } = this.props;
    if (!isChangingName && userInfo.get('nickname') !== name) {
      new Promise((resolve, reject) =>
        this.setState(() => ({
          isChangingName: true,
        }), () => this.props.changeName({
          values: {
            nickname: this.state.name,
          },
          resolve,
          reject,
        })),
      ).then((response) => {
        this.setState({
          name: response,
          isChangingName: false,
        });
      }).catch(() => {
        this.setState({
          name: this.props.userInfo.get('nickname'),
          isChangingName: false,
        });
      });
    }
  }

  render() {
    const { userInfo, uploadAvatar, abroadPlan } = this.props;
    return (
      <Container>
        <Item>
          <p>头像</p>
          <Avatar
            src={userInfo.get('avatar')}
            width="0.5rem"
            height="0.5rem"
            onClick={() => uploadAvatar()}
          />
          <Image src={imgArrow} alt="arrow" />
        </Item>
        <Item>
          <p>昵称</p>
          <Input
            type="text"
            placeholder="昵称不能为空"
            value={this.state.isChangingName ? '昵称修改中，请稍后...' : this.state.name}
            onChange={this.changeName}
            onBlur={() => this.updateName()}
            onKeyPress={({ key }) => {
              if (key === 'Enter') {
                this.updateName();
              }
            }}
          />
          <Image src={imgArrow} alt="arrow" />
        </Item>
        <Item onClick={() => history.push('/user/phone')}>
          <p>手机号</p>
          <span>{userInfo.get('phone')}</span>
          <Image src={imgArrow} alt="arrow" />
        </Item>
        {/* <Item onClick={() => history.push('/user/password')}>
          <p>修改密码</p>
          <Image src={imgArrow} alt="arrow" />
        </Item> */}
        <Item onClick={() => history.push('/user/abroad/plan')}>
          <p>留学规划</p>
          <span>{abroadPlan.size ? '已' : '未'}提交</span>
          <Image src={imgArrow} alt="arrow" />
        </Item>
      </Container>
    );
  }

}
