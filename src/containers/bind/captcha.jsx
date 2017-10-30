import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import CaptchaView from 'components/bind/captcha';
import { sendCaptcha, bindAccount } from 'actions/auth';
import history from 'helpers/history';

class Captcha extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { value, type } = this.props;
    if (!value) {
      history.replace({
        pathname: `/bind/${type === 'email' ? 'email' : ''}`,
        search: history.location.search,
      });
    }
  }

  render() {
    return <CaptchaView {...this.props} />;
  }
}

const bindInfoSelector = createSelector(
  state => state.getIn(['user', 'bind']),
  bindInfo => {
    const type = bindInfo.has('phone') ? 'phone' : 'email';
    const value = bindInfo.get(type) || '';
    return {
      type,
      value,
    };
  }
);

function mapStateToProps(state) {
  const bindInfo = bindInfoSelector(state);
  return {
    bindInfo,
  };
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps.bindInfo,
    bindAccount: dispatchProps.bindAccount,
    sendCaptcha: data =>
      dispatchProps.sendCaptcha({
        captchaType: 'new',
        ...stateProps.bindInfo,
        ...data,
      }),
  };
}

export default connect(mapStateToProps, { sendCaptcha, bindAccount }, mergeProps)(Captcha);
