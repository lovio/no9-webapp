import { connect } from 'react-redux';
import { changePhone, sendCaptcha } from 'actions/auth';
import SignUpView from 'components/auth/signUp';

function mapStateToProps() {
  return {
    type: 'changePhone',
  };
}

function mergeProps(stateProps, dispatchProps) {
  return {
    ...stateProps,
    changePhone: dispatchProps.changePhone,
    sendCaptcha: data => dispatchProps.sendCaptcha({
      captchaType: 'bind',
      type: 'phone',
      ...data,
    }),
  };
}

export default connect(mapStateToProps, { changePhone, sendCaptcha }, mergeProps)(SignUpView);
