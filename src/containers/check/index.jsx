import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadGrade } from 'actions/user';
import SignInView from 'components/check/signIn';
import SignUpView from 'components/check/signUp';
import Tabs from 'components/check/tabs';
import Outcome from 'components/check/outcome';

const Check = props => {
  const {
    location: { pathname },
    grade,
  } = props;
  return (
    <div>
      <Tabs pathname={pathname} />
      {pathname === '/grade' ? <SignInView {...props} /> : <SignUpView {...props} />}
      <Outcome grade={grade} />
    </div>
  );
};

Check.propTypes = {
  location: PropTypes.object.isRequired,
  grade: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    grade: state.getIn(['extra', 'grade']),
  };
}

export default connect(mapStateToProps, { loadGrade })(Check);
