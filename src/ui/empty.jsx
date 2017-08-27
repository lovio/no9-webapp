import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import img404 from 'images/404.png';
import imgNoContent from 'images/no-content.png';
import imgIsLoading from 'images/loading.gif';

const imgMapping = {
  404: img404,
  'no-content': imgNoContent,
  isLoading: imgIsLoading,
};

const descMapping = {
  404: '程序小哥正在努力建设中',
  isLoading: '正在加载中...',
  'no-content': '暂无内容',
  'no-exercise': '暂无练习！',
};

const Container = styled.p`
  margin: 0;
  padding-top: 2.2rem;
  background-image: url('${props => imgMapping[props.type]}');
  background-repeat: no-repeat;
  ${(props) => {
    if (props.type === 'isLoading') {
      return 'background-size: 0.3rem 0.3rem;background-position: center 1.68rem;';
    }
    return 'background-size: 1.2rem 1.2rem;background-position: center 1rem;';
  }}
  text-align: center;
  font-size: 0.11rem;
  line-height: 0.35rem;
  color: #8F9DA5;
`;

export default function Empty({ type }) {
  return (
    <div style={{ height: '100%', backgroundColor: '#F7F8FA' }}>
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
