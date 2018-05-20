import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import styled from 'styled-components';

import IconCalendar from './icons/calendar.svg';
import IconAward from './icons/award.svg';
import IconSetting from './icons/settings.svg';
// import IconUserCheck from './icons/user-check.svg';
import IconUsers from './icons/users.svg';
import IconShare from './icons/share-2.svg';
import IconList from './icons/list.svg';
import IconFileMinus from './icons/file-minus.svg';
import IconGitLab from './icons/gitlab.svg';
import IconInfo from './icons/info.svg';

const Container = styled.div`
  background-color: white;
  padding: 0.03rem 0 0.03rem 0.2rem;
  font-size: 0.18rem;
  color: #4a4a4a;
  margin-bottom: 0.1rem;
`;

const Item = styled.div`
  overflow: auto;
  line-height: 0.52rem;
  border-bottom: 1px solid #dbdcdd;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Icon = styled.span`
  display: inline-block;
  width: 0.46rem;
  text-align: center;
  svg {
    width: 0.2rem;
    height: 0.2rem;
  }
`;

const Menu = ({ user }) => (
  <div>
    <Container>
      <Item onClick={() => history.push('/mine/orders')}>
        <Icon>
          <IconCalendar />
        </Icon>
        我的订单
      </Item>
      <Item onClick={() => history.push('/mine/certs')}>
        <Icon>
          <IconAward />
        </Icon>
        车位电子所有权证书
      </Item>
      <Item onClick={() => history.push('/mine/profile')}>
        <Icon>
          <IconSetting />
        </Icon>
        账户设置
      </Item>
      {/* <Item onClick={() => history.push('/mine/profile')}>
        <Icon>
          <IconUserCheck />
        </Icon>
        实名信息
      </Item> */}
      <Item onClick={() => history.push('/mine/relations')}>
        <Icon>
          <IconUsers />
        </Icon>
        我的客户关系
      </Item>
      {user.get('grade') === 5 && (
        <Item onClick={() => history.push('/mine/invite')}>
          <Icon>
            <IconShare />
          </Icon>
          生成我的邀请码
        </Item>
      )}
    </Container>

    <Container>
      <Item onClick={() => history.push('/mine/records')}>
        <Icon>
          <IconList />
        </Icon>
        收支明细
      </Item>
      <Item onClick={() => history.push('/mine/records?type=withdraw')}>
        <Icon>
          <IconFileMinus />
        </Icon>
        提现记录
      </Item>
      <Item onClick={() => history.push('/mine/cards')}>
        <Icon>
          <IconGitLab />
        </Icon>
        提现设置
      </Item>
    </Container>
    <Container>
      <Item onClick={() => history.push('/about')}>
        <Icon>
          <IconInfo />
        </Icon>
        关于九路泊车
      </Item>
    </Container>
  </div>
);
Menu.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Menu;
