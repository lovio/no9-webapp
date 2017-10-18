import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import img404 from './404.png';
import imgNoContent from './no-content.png';

const imgMapping = {
  404: img404,
  'no-content': imgNoContent,
};

const descMapping = {
  404: '程序小哥正在努力建设中',
  'no-content': '暂无',
};

const Container = styled.p`
  margin: 0;
  padding-top: 2.2rem;
  background-image: url('${props => imgMapping[props.type]}');
  background-repeat: no-repeat;
  background-size: 1.2rem 1.2rem;
  background-position: center 1rem;
  text-align: center;
  font-size: 0.11rem;
  line-height: 0.35rem;
  color: #8F9DA5;
`;

export default function Empty({ type }) {
  return (
    <div style={{ height: '100%' }}>
      <Container type={type}>{descMapping[type]}</Container>
    </div>
  );
}

Empty.propTypes = {
  type: PropTypes.string,
};

Empty.defaultProps = {
  type: '404',
};
