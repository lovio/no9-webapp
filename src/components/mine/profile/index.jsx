import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 0.1rem;
  padding-left: 0.2rem;
  background-color: white;
`;

const Item = styled.div`
  box-sizing: content-box;
  border-bottom: 0.01rem solid #eaeff2;
  display: flex;
  align-items: center;
  padding: 0.15rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #4a4a4a;

  &:last-of-type {
    border: none;
  }

  p {
    width: 0.65rem;
  }

  span:first-of-type {
    flex: 1;
  }
`;

const Input = styled.input`
  display: inline-block;
  width: 100%;
  flex: 1;
  outline: none;
  border: none;
  color: #818b96;
  text-align: left;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  display: inline-block;
  width: 100%;
  flex: 1;
  outline: none;
  border: none;
  color: #818b96;
  text-align: left;

  &:focus {
    outline: none;
  }
  resize: none;
`;

const Save = styled.div`
  padding-right: 0.2rem;
  display: inline-block;
  font-size: 0.12rem !important;
  color: #31b9da;
`;

const Help = styled.p`
  text-align: center;
  margin-top: 0.4rem;
  font-size: 0.14rem;
  color: #31b9da;
  line-height: 0.2rem;
`;

const isChanging = {
  name: false,
  IDCardNo: false,
  email: false,
  address: false,
};

export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isChanging,
      name: props.user.get('name') || '',
      IDCardNo: props.user.get('IDCardNo') || '',
      email: props.user.get('email') || '',
      address: props.user.get('address') || '',
    };
  }

  componentWillUpdate(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({
        isChanging,
        name: nextProps.user.get('name') || '',
        IDCardNo: nextProps.user.get('IDCardNo') || '',
        email: nextProps.user.get('email') || '',
        address: nextProps.user.get('address') || '',
      });
    }
  }

  change = field => e => {
    if (!this.state.isChanging[field]) {
      const value = e.target.value;
      this.setState(() => ({
        [field]: value,
      }));
    }
  };

  update = ({ field }) =>
    new Promise((resolve, reject) =>
      this.setState(
        prevState => ({
          isChanging: {
            ...prevState.isChanging,
            [field]: true,
          },
        }),
        () =>
          this.props.updateProfile({
            values: {
              field,
              value: this.state[field],
            },
            resolve,
            reject,
          })
      )
    )
      .then(() => {
        this.setState({
          [field]: this.state[field],
          isChanging,
        });
      })
      .catch(() => {
        this.setState({
          [field]: this.props.user.get(field) || '',
          isChanging,
        });
      });

  render() {
    const { user } = this.props;
    return (
      <div>
        <Container>
          <Item>
            <p>姓名</p>
            {user.get('name') ? (
              <span>{user.get('name')}</span>
            ) : (
              <Input
                type="text"
                placeholder="点击填写，一经保存不能修改"
                value={this.state.isChanging.name ? '姓名修改中，请稍后...' : this.state.name}
                onChange={this.change('name')}
                {...(this.state.isChanging.name ? { readOnly: 'readonly' } : {})}
              />
            )}
            {!user.get('name') && (
              <Save onClick={() => !this.state.isChanging.name && this.update({ field: 'name' })}>保 存</Save>
            )}
          </Item>
          <Item>
            <p>身份证</p>
            {user.get('IDCardNo') ? (
              <span>{user.get('IDCardNo')}</span>
            ) : (
              <Input
                type="text"
                placeholder="点击填写，一经保存不能修改"
                value={this.state.isChanging.IDCardNo ? '身份证号修改中，请稍后...' : this.state.IDCardNo}
                onChange={this.change('IDCardNo')}
                {...(this.state.isChanging.IDCardNo ? { readOnly: 'readonly' } : {})}
              />
            )}
            {!user.get('IDCardNo') && (
              <Save onClick={() => !this.state.isChanging.IDCardNo && this.update({ field: 'IDCardNo' })}>保 存</Save>
            )}
          </Item>
          <Item>
            <p>手机号</p>
            <span>{user.get('phone')}</span>
          </Item>
        </Container>

        <Container>
          <Item>
            <p>邮箱</p>
            <Input
              type="text"
              placeholder="点击填写邮箱"
              value={this.state.isChanging.email ? '邮箱修改中，请稍后...' : this.state.email}
              onChange={this.change('email')}
              {...(this.state.isChanging.email ? { readOnly: 'readonly' } : {})}
            />
            <Save onClick={() => !this.state.isChanging.email && this.update({ field: 'email' })}>保 存</Save>
          </Item>
          <Item>
            <p>快递地址</p>
            <TextArea
              rows="3"
              type="text"
              placeholder="点击填写快递地址"
              value={this.state.isChanging.address ? '快递地址修改中，请稍后...' : this.state.address}
              onChange={this.change('address')}
              {...(this.state.isChanging.address ? { readOnly: 'readonly' } : {})}
            />
            <Save onClick={() => !this.state.isChanging.address && this.update({ field: 'address' })}>保 存</Save>
          </Item>
        </Container>
        <Help>联系客服获得帮助</Help>
      </div>
    );
  }
}
