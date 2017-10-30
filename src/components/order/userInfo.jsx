import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.2rem;
  margin-bottom: 0.1rem;
`;

const Title = styled.div`
  padding: 0.12rem 0 0.1rem 0.14rem;
  text-align: center;
  border-bottom: 1px solid #dbdcdd;
`;

const Info = styled.div`
  padding: 0.15rem 0 0 0.26rem;
`;

const Item = styled.p`
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.16rem;
  margin-bottom: 0.05rem;
  span {
    display: inline-block;
    width: 1rem;
  }
`;

const Tips = styled.div`
  /* 提示：购买后实名信息无法更改: */
  padding: 0.05rem 0 0.15rem;
  font-size: 0.12rem;
  color: #ff7249;
`;

const Change = styled.span`
  margin-right: 0.2rem;
  font-size: 0.12rem;
  color: #0889ff;
  float: right;
`;

const UserInfo = ({ user }) => (
  <Container>
    <Title>请确认归属人实名信息</Title>
    <Info>
      <Item>
        <span>姓名</span>
        <span>{user.get('name')}</span>
      </Item>
      <Item>
        <span>身份证号码</span>
        <span>{user.get('IDCardNo')}</span>
      </Item>
      <Item>
        <span>联系电话</span>
        <span>{user.get('phone')}</span>
      </Item>
      <Tips>
        提示：购买后实名信息无法更改<Change>如何修改？</Change>
      </Tips>
    </Info>
  </Container>
);

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
