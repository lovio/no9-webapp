import React from 'react';
import Slider from 'ui/slider';
import styled from 'styled-components';

import imgSlide1 from './slide-product.jpg';
import imgSlide2 from '../home/banner.jpg';

const Container = styled.div`
  img {
    width: 100%;
    height: 1.63rem;
  }
`;

export default function Slides() {
  return (
    <Container>
      <Slider>
        <img src={imgSlide2} alt="carport" />
        <img src={imgSlide1} alt="carport" />
      </Slider>
    </Container>
  );
}
