import React from 'react';
import Slider from 'ui/slider';
import styled from 'styled-components';

import imgCarport from './carport.jpg';

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
        <img src={imgCarport} alt="carport" />
      </Slider>
    </Container>
  );
}
