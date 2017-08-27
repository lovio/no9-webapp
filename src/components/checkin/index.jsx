import React from 'react';
import history from 'helpers/history';
import Helmet from 'react-helmet';

import { DefaultContainer, BasicOverflowContainer } from 'ui';
import { Button } from 'ui/button';

import Calendar from './calendar';
import { Desc, BtnContainer } from './components';

export default function CheckinView(props) {
  return (
    <DefaultContainer>
      <Helmet>
        <title>学习日程</title>
      </Helmet>
      <BasicOverflowContainer>
        <Calendar {...props} />
        <Desc>已签到</Desc>
        <BtnContainer>
          <Button onClick={() => history.push('/')}>去做题</Button>
        </BtnContainer>
      </BasicOverflowContainer>
    </DefaultContainer>
  );
}

CheckinView.propTypes = {
};
