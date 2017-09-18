import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSearch } from 'helpers/history';
import { sendCaptcha, signIn, signUp } from 'actions/auth';
import SignInView from 'components/auth/signIn';
import SignUpView from 'components/auth/signUp';
import Tabs from 'components/auth/tabs';

const Auth = (props) => {
  const { location: { pathname } } = props;
  return (
    <div>
      <Tabs pathname={pathname} />
      {pathname === '/login' ? <SignInView {...props} /> : <SignUpView {...props} />}
    </div>
  );
};

Auth.propTypes = {
  location: PropTypes.object.isRequired,
};

const initialValuesSelector = createSelector(
  (state, props) => {
    const search = getSearch(props.location.search);
    return search.referrerCode;
  },
  referrerCode => ({
    referrerCode,
  }),
);

function mapStateToProps(state, props) {
  return {
    initialValues: initialValuesSelector(state, props),
  };
}

export default connect(mapStateToProps, { signIn, signUp, sendCaptcha })(Auth);
