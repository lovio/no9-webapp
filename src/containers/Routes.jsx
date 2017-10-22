import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Artboard, Container, Overflow } from 'ui';

import FooterView from 'components/footer';
import About from 'components/static/about';
import Agreement from 'components/static/agreement';

import AuthenticatedHOC from './auth/AuthenticatedHOC';
import Confirm from './common/confirm';
import Tips from './common/tips';
import Home from './home';
import Auth from './auth';
import ResetPwd from './auth/ResetPwd';
import Mine from './mine';
import Invite from './mine/invite';
import Zone from './zone';
import Product from './product';
import NewOrder from './order/new';
import Order from './order';
import Records from './mine/records';

// mine
import Cards from './mine/cards';
import Orders from './mine/orders';
import NewCard from './mine/newCard';
import Profile from './mine/profile';
import Relations from './mine/relations';
import Withdraw from './mine/withdraw';
import Certs from './mine/certs';

export default function Routes() {
  return (
    <Artboard>
      <Container>
        <Tips />
        <Confirm />
        <Overflow>
          <Switch>
            <Route exact path="/" component={AuthenticatedHOC(Home)} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/signup" component={Auth} />
            <Route exact path="/resetpwd" component={ResetPwd} />
            <Route exact path="/mine" component={AuthenticatedHOC(Mine)} />
            <Route exact path="/mine/invite" component={AuthenticatedHOC(Invite)} />
            <Route exact path="/mine/withdraw" component={AuthenticatedHOC(Withdraw)} />
            <Route exact path="/mine/cards" component={AuthenticatedHOC(Cards)} />
            <Route exact path="/mine/cards/new" component={AuthenticatedHOC(NewCard)} />
            <Route exact path="/mine/profile" component={AuthenticatedHOC(Profile)} />
            <Route exact path="/mine/records" component={AuthenticatedHOC(Records)} />
            <Route exact path="/mine/relations" component={AuthenticatedHOC(Relations)} />
            <Route exact path="/mine/certs" component={AuthenticatedHOC(Certs)} />
            <Route exact path="/products" component={AuthenticatedHOC(Product)} />
            <Route exact path="/zones" component={AuthenticatedHOC(Zone)} />
            <Route exact path="/orders/new" component={AuthenticatedHOC(NewOrder)} />
            <Route exact path="/mine/orders" component={AuthenticatedHOC(Orders)} />
            <Route exact path="/mine/orders/:orderId" component={AuthenticatedHOC(Order)} />
            <Route exact path="/about" component={About} />
            <Route exact path="/agreement" component={Agreement} />
          </Switch>
        </Overflow>
        <Route exact path="/" component={FooterView} />
        <Route exact path="/mine" component={FooterView} />
        <Route exact path="/products" component={FooterView} />
        <Route exact path="/zones" component={FooterView} />
      </Container>
    </Artboard>
  );
}
