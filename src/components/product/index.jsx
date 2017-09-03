import React from 'react';
import Slides from './slides';
import Intro from './intro';
import Ways from './ways';
import Desc from './desc';
import Rights from './rights';

export default function HomeView() {
  return (
    <div>
      <Slides />
      <Intro />
      <Ways />
      <Desc />
      <Rights />
    </div>
  );
}
