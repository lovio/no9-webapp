import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image } from 'ui';
import imgCredits from 'images/credits.png';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.4rem 0.5rem;
  z-index: 900;
  background: rgba(0,0,0,0.50);
`;

const ModalBox = styled.div`
  display: flex;
  background-color: #FFF;
  padding: 0.2rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 0.03rem;


  img {
    width: 0.5rem;
    height: 0.5rem;
  }

  p {
    margin: 0;
    font-size: 0.14rem;
    line-height: 0.2rem;
    margin-top: 0.08rem;
  }
  p:nth-of-type(1) {
    color: #8F9DA5;
  }
  p:nth-of-type(2) {
    color: #2E3236;
  }
`;

export default function Modal({ modal, hideModal }) {
  return (
    <Container onClick={() => hideModal()}>
      {
        modal.get('type') === 'credits' && (
          <ModalBox>
            <Image src={imgCredits} alt="credits" />
            <p>{modal.getIn(['data', 'desc'])}</p>
            <p>恭喜您获得{modal.getIn(['data', 'point'])}积分</p>
          </ModalBox>
        )
      }
    </Container>
  );
}

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};
