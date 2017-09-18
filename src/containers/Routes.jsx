import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Overflow } from 'ui';

import FooterView from 'components/footer';

import AuthenticatedHOC from './auth/AuthenticatedHOC';
import Tips from './common/tips';
import Home from './home';
import Auth from './auth';
import ResetPwd from './auth/ResetPwd';
import Mine from './mine';
import Invite from './mine/invite';
import Zone from './zone';
import Product from './product';
import Order from './order';

// mine
import Cards from './mine/cards';
import NewCard from './mine/newCard';
import Profile from './mine/profile';

export default function Routes() {
  return (
    <Container>
      <Tips />
      <Overflow>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/signup" component={Auth} />
          <Route exact path="/resetpwd" component={ResetPwd} />
          <Route exact path="/mine" component={AuthenticatedHOC(Mine)} />
          <Route exact path="/mine/invite" component={AuthenticatedHOC(Invite)} />
          <Route exact path="/mine/cards" component={AuthenticatedHOC(Cards)} />
          <Route exact path="/mine/cards/new" component={AuthenticatedHOC(NewCard)} />
          <Route exact path="/mine/profile" component={AuthenticatedHOC(Profile)} />
          <Route exact path="/products" component={Product} />
          <Route exact path="/zones" component={Zone} />
          <Route exact path="/orders/new" component={AuthenticatedHOC(Order)} />
        </Switch>
      </Overflow>
      <Route exact path="/" component={FooterView} />
      <Route exact path="/mine" component={FooterView} />
      <Route exact path="/products" component={FooterView} />
      <Route exact path="/zones" component={FooterView} />
    </Container>
  );
}
