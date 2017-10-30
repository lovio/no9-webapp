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
  background: rgba(0, 0, 0, 0.5);
`;

const ConfirmBox = styled.div`
  display: flex;
  background-color: #fff;
  padding: 0.2rem 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.03rem;
`;

const Title = styled.div`
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: #4a4a4a;
`;

const DescList = styled.div`
  margin: 0.16rem 0 0.3rem;
`;

const Desc = styled.div`
  line-height: 0.2rem;
  font-size: 0.14rem;
  color: #4a4a4a;
  text-align: center;
`;

const Btns = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-top: 0.01rem solid #eaeff2;
  height: 0.5rem;
  display: flex;
`;

const Button = styled.div`
  /* 取消: */
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  line-height: 0.5rem;
  color: #4a4a4a;
  width: 100%;
  text-align: center;

  &:first-of-type {
    border-right: 0.01rem solid #eaeff2;
  }
  &:last-of-type {
    color: #e01053;
  }
`;

export default function Confirm({ hideConfirm, confirm, handleConfirm }) {
  if (!confirm.size) {
    return null;
  }
  return (
    <Container>
      <ConfirmBox>
        <Title>提示信息</Title>
        <DescList>{confirm.get('desc').map((desc, index) => <Desc key={index}>{desc}</Desc>)}</DescList>
        <Btns>
          <Button onClick={() => hideConfirm()}>取消</Button>
          <Button onClick={() => handleConfirm()}>确定</Button>
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
