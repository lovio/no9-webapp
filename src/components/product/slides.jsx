import React from 'react';
import Slider from 'ui/slider';
import styled from 'styled-components';

import imgCarport from './carport.jpg';

const Container = styled.div`
  img {
    width: 100%;
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
