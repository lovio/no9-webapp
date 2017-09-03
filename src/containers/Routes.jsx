import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Overflow } from 'ui';

import FooterView from 'components/footer';

import Home from './home';
import Product from './product';

export default function Routes() {
  return (
    <Container>
      <Overflow>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product" component={Product} />
        </Switch>
      </Overflow>
      <Route exact path="/" component={FooterView} />
      <Route exact path="/product" component={FooterView} />
    </Container>
  );
}
