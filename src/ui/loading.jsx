import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import imgLoading from 'images/loading.gif';

const Container = styled.div`
  margin-top: 0.2rem;
  text-align: center;

  img {
    height: 0.2rem;
  }

  span {
    font-size: 0.14rem;
  }
`;

export default function Loading({ type, color }) {
  return (
    <Container>
      {
        type === 'NORMAL' ? (
          <div>
            <img src={imgLoading} alt="" />
          </div>
        ) : (
          <span style={{ color }}>正在加载...</span>
        )
      }
    </Container>
  );
}

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  type: 'NORMAL',
  color: '#fff',
};
