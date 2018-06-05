import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 0.4rem;
  font-size: 0.2rem;
  color: #4a4a4a;
  line-height: 0.18rem;
  margin-bottom: 0.1rem;
  text-align: center;
`;

const Outcome = ({ grade }) => <Container>{grade && `该用户为：${grade}`}</Container>;

Outcome.propTypes = {
  grade: PropTypes.string.isRequired,
};

export default Outcome;
