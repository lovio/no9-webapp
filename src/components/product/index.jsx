import React from 'react';
import { Wrapper } from 'components/common/wrapper';
import Slides from './slides';
import Intro from './intro';
import Ways from './ways';
import Desc from './desc';
import Rights from './rights';

export default () => (
  <Wrapper>
    <Slides />
    <Intro />
    <Ways />
    <Desc />
    <Rights />
  </Wrapper>
);
