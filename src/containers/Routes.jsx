import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Overflow } from 'ui';

import FooterView from 'components/footer';

import Tips from './common/tips';
import Home from './home';
import SignIn from './auth/SignIn';
import Mine from './mine';
import Product from './product';
import Order from './order';

export default function Routes() {
  return (
    <Container>
      <Tips />
      <Overflow>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/mine" component={Mine} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/orders/new" component={Order} />
        </Switch>
      </Overflow>
      <Route exact path="/" component={FooterView} />
      <Route exact path="/mine" component={FooterView} />
      <Route exact path="/product" component={FooterView} />
    </Container>
  );
}
