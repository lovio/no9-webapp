import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Overflow } from 'ui';

import FooterView from 'components/footer';

import Home from './home';

export default function Routes() {
  return (
    <Container>
      <Overflow>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Overflow>
      <Route exact path="/" component={FooterView} />
    </Container>
  );
}
