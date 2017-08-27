import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import history from 'helpers/history';

import { Image } from 'ui';
import imgDone from 'images/done.png';

const StyledImage = styled(Image)`
  width: 0.45rem!important;
  height: 0.28rem!important;
  margin: 0!important;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-size: 0.11rem;
    line-height: 0.44rem;
    color: #8F9DA5;
  }
`;

const Progress = styled.div`
  width: 0.5rem;
  background-color: #EAEFF2;
  border-radius: 999px;
  height: 0.04rem;
  display: flex;
  margin-left: 0.05rem;

  span {
    display: inline-block;
    background-color: #FE663B;
    border-radius: 999px;
    height: 0.04rem;
    width: ${props => props.rate * 0.5}rem;
  }
`;

export default function ProgressBar({ rate }) {
  if (+rate === 0) {
    return null;
  }
  if (+rate === 1) {
    return (
      <StyledImage src={imgDone} alt="done" />
    );
  }
  return (
    <Container>
      <p>{Number(rate * 100).toFixed(0)}%</p>
      <Progress rate={rate}><span /></Progress>
    </Container>
  );
}

ProgressBar.propTypes = {
  rate: PropTypes.string.isRequired,
};
