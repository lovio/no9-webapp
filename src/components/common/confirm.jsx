import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.9rem 0.5rem;
  z-index: 500;
  background: rgba(0,0,0,0.50);
`;

const ConfirmBox = styled.div`
  display: flex;
  background-color: #FFF;
  padding: 0.2rem 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.03rem;
`;

const Title = styled.div`
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: #2E3236;
`;

const DescList = styled.div`
  margin: 0.16rem 0 0.3rem;
`;

const Desc = styled.div`
  line-height: 0.21rem;
  font-size: 0.14rem;
  color: #2E3236;
  text-align: center;
`;

const Btns = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-top: 0.01rem solid #EAEFF2;
  height: 0.5rem;
  display: flex;
`;

const Button = styled.div`
  /* 取消: */
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  line-height: 0.5rem;
  color: #2E3236;
  width: 100%;
  text-align: center;

  &:first-of-type {
    border-right: 0.01rem solid #EAEFF2;
  }
  &:last-of-type {
    color: #FE663B;
  }
`;

function getDescList(confirm) {
  switch (confirm.get('code')) {
    case 'USER_10106':
      return ['亲，您输入的手机号已经注册', '请使用账号进行绑定'];
    case 'USER_10101':
      return ['亲，您输入的邮箱地址已经注册', '请使用账号进行绑定'];
    case 10301:
      return ['亲，您已经绑定过微信', confirm.get('name'), '是否解除之前的微信账号'];
    default:
      return [];
  }
}

export default function Confirm({ hideConfirm, confirm, handleConfirm }) {
  const descList = getDescList(confirm);
  if (!confirm.size || !descList.length) {
    return null;
  }
  return (
    <Container>
      <ConfirmBox>
        <Title>提示信息</Title>
        <DescList>
          {
            descList.map((desc, index) => <Desc key={index}>{desc}</Desc>) // eslint-disable-line
          }
        </DescList>
        <Btns>
          <Button onClick={() => hideConfirm()}>取消</Button>
          <Button onClick={() => handleConfirm()} >确定</Button>
        </Btns>
      </ConfirmBox>
    </Container>
  );
}

Confirm.propTypes = {
  confirm: PropTypes.object.isRequired,
  hideConfirm: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
