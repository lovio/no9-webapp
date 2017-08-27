import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import times from 'lodash-es/times';

import ImgStar from './star.svg';
import ImgStarGrey from './star-grey.svg';

const COUNT = 5;

const Container = styled.span`
  svg {
    margin-right: 0.03rem;
    width: 0.12rem;
    height: 0.12rem;
  }
`;

export default function Star({ count }) {
  return (
    <Container>
      {
        times(COUNT, index => createElement(
          index >= count ? ImgStarGrey : ImgStar,
          {
            key: index,
          },
        ))
      }
    </Container>
  );
}

Star.propTypes = {
  count: PropTypes.number.isRequired,
};
