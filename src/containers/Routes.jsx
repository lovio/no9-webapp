import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Container, OverflowContainer } from 'ui';

import FooterView from 'components/footer';
import Agreement from 'modules/articles/components/agreement';
import Article from 'modules/articles/containers/article';

import { routes } from 'modules';

import Tips from './common/tips';
import Confirm from './common/confirm';
import Medal from './common/medal';
import AuthenticatedHOC from './auth/AuthenticatedHOC';
import Bind from './bind';
// import BindEmail from './bind/email';
import BindCaptcha from './bind/captcha';
import BindAccount from './bind/account';
import UnbindAccount from './bind/unbind';
import Home from './home';
import Mine from './mine';
import Share from './share';
import Checkin from './checkin';
import User from './user';
import ExamTime from './user/examTime';
import AbroadPlan from './user/abroadPlan';
// import ChangePassword from './auth/ChangePassword';
import ChangePhone from './auth/ChangePhone';

export default function Routes() {
  return (
    <Container>
      <Tips />
      <Confirm />
      <Medal />
      <OverflowContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/bind" component={Bind} />
          <Route exact path="/signin" component={Bind} />
          {/* <Route exact path="/bind/email" component={BindEmail} /> */}
          <Route exact path="/bind/captcha" component={BindCaptcha} />
          <Route exact path="/bind/account" component={BindAccount} />
          <Route exact path="/bind/unbind" component={UnbindAccount} />
          <Route exact path="/mine" component={AuthenticatedHOC(Mine)} />
          <Route exact path="/mine/checkin" component={AuthenticatedHOC(Checkin)} />
          <Route exact path="/user" component={AuthenticatedHOC(User)} />
          <Route exact path="/user/abroad/plan" component={AuthenticatedHOC(AbroadPlan)} />
          <Route exact path="/user/phone" component={ChangePhone} />
          <Route exact path="/user/examtime" component={AuthenticatedHOC(ExamTime)} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/agreement" component={Agreement} />
          <Route exact path="/articles/:id" component={Article} />
          {renderRoutes(routes)}
        </Switch>
      </OverflowContainer>
      <Route exact path="/" component={FooterView} />
      <Route exact path="/mine" component={FooterView} />
      <Route exact path="/ti/:subjectId" component={FooterView} />
    </Container>
  );
}
