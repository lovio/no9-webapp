import React from 'react';
import random from 'lodash-es/random';

import {
  Container,
  TestItem,
} from './components';

export default function TestView() {
  return (
    <Container>
      <TestItem type="speaking" count={random(1000, 2000)} isAvailable />
      <TestItem type="listening" count={random(1500, 3000)} isAvailable />
      <TestItem type="reading" count={random(1000, 2000)} isAvailable />
      <TestItem type="writing" count={random(1000, 1500)} isAvailable />
    </Container>
  );
}

TestView.propTypes = {
};
