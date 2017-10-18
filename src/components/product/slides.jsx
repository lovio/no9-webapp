import React from 'react';
import Slider from 'ui/slider';
import styled from 'styled-components';

import imgSlide1 from './slide-dafeng.jpg';
import imgSlide2 from './slide-dafeng2.jpg';
import imgSlide3 from './slide-project.jpg';

const Container = styled.div`
  img {
    width: 100%;
    height: 2.2rem;
  }
`;

export default function Slides() {
  return (
    <Container>
      <Slider>
        <img src={imgSlide1} alt="carport" />
        <img src={imgSlide2} alt="carport" />
        <img src={imgSlide3} alt="carport" />
      </Slider>
    </Container>
  );
}
