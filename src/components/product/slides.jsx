import React from 'react';
import Slider from 'ui/slider';
import styled from 'styled-components';

import imgCarport from './carport.jpg';
import imgCarport2 from './carport2.jpg';
import imgCarport3 from './carport3.jpg';
import imgCarport4 from './carport4.jpg';

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
        <img src={imgCarport} alt="carport" />
        <img src={imgCarport2} alt="carport" />
        <img src={imgCarport3} alt="carport" />
        <img src={imgCarport4} alt="carport" />
      </Slider>
    </Container>
  );
}
