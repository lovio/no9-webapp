import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSearch } from 'helpers/history';
import { sendCaptcha, signIn } from 'actions/auth';
import SignInView from 'components/auth/signIn';

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

export default connect(mapStateToProps, { signIn, sendCaptcha })(SignInView);
