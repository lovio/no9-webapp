import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'helpers/history';
import * as authActions from 'actions/auth';

export default function requireAuthentication(Component) {
  const AuthenticatedComponent = ({ token, ...others }) => {
    if (!token) {
      const { pathname, search } = others.location;
      const redirectUrl = encodeURIComponent(`${pathname}${search}`);
      history.replace(`/login?redirectUrl=${redirectUrl}`);
      // checkAuth要和transfer结合起来
    }
    return <Component {...others} />;
  };

  AuthenticatedComponent.propTypes = {
    // checkAuth: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
  };

  function mapStateToProps(state, props) {
    return {
      token: state.getIn(['user', 'token']) || '',
    };
  }

  return withRouter(connect(mapStateToProps, {})(AuthenticatedComponent));
}
