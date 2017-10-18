import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import imgError from './error.png';
import imgSuccess from './success.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0.44rem;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1000;
`;

const Toast = styled.div`
  background: rgba(52, 61, 72, 0.9);
  box-shadow: 0 0.03rem 0.15rem 0 rgba(52, 61, 72, 0.3);
  border-radius: 9999px;
  padding: 0.1rem 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 0.2rem;
    height: 0.2rem;
  }

  p {
    padding-left: 0.1rem;
    flex: 1;
    margin: 0;
    font-size: 0.12rem;
    line-height: 0.2rem;
    color: #ffffff;
    letter-spacing: 0;
    max-width: 2rem;
    word-wrap: break-word;
    word-break: normal;
  }
`;

export default function Toasts({ toasts }) {
  return (
    <Container>
      {toasts.toList().map(toast => (
        <Toast key={toast.get('id')}>
          <img src={toast.get('type') === 'error' ? imgError : imgSuccess} alt="error or success" />
          <p>{toast.get('msg')}</p>
        </Toast>
      ))}
    </Container>
  );
}

Toasts.propTypes = {
  toasts: PropTypes.object.isRequired,
};
