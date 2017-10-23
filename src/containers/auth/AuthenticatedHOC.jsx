import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authActions from 'actions/auth';

export default function requireAuthentication(Component) {
  const AuthenticatedComponent = ({ checkAuth, ...others }) => {
    // console.log('authcheck');
    checkAuth();
    return <Component {...others} />;
  };

  AuthenticatedComponent.propTypes = {
    checkAuth: PropTypes.func.isRequired,
  };

  return connect(null, { checkAuth: authActions.checkAuth })(AuthenticatedComponent);
}
