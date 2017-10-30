import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import styled from 'styled-components';
import { Button } from 'ui/button';
import Empty from 'ui/empty';

import ImgSuccess from './success.svg';
import ImgFailure from './error.svg';

const Container = styled.div`
  padding: 0.45rem 0.15rem;
  text-align: center;

  svg {
    width: 0.5rem;
    height: 0.5rem;
  }

  p {
    margin: 0.1rem 0 0.45rem;
    /* 亲，解绑成功: */
    font-size: 0.12rem;
    line-height: 0.18rem;
    color: #2e3236;
    letter-spacing: 0;
  }
`;

export default class UnbindView extends Component {
  static propTypes = {
    unbind: PropTypes.object.isRequired,
    unbindAccount: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { unbind } = this.props;
    if (!unbind.size || unbind.get('status') === 'success') {
      history.replace('/');
    } else {
      this.props.unbindAccount();
    }
  }

  render() {
    const status = this.props.unbind.get('status');
    return (
      <Container>
        {status === 'request' && <Empty type="isLoading" />}
        {status === 'success' && (
          <div>
            <ImgSuccess />
            <p>亲，解绑成功！</p>
            <Button
              onClick={() => {
                history.replace({
                  pathname: '/bind/account',
                  search: history.location.search,
                });
              }}>
              立即绑定
            </Button>
          </div>
        )}
        {status === 'failure' && (
          <div>
            <ImgFailure />
            <p>亲，解绑失败！</p>
            <Button onClick={() => this.props.unbindAccount()}>重新解绑</Button>
          </div>
        )}
      </Container>
    );
  }
}
