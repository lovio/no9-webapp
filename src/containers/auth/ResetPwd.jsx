import { connect } from 'react-redux';
import { sendCaptcha, resetPwd } from 'actions/auth';
import ResetPwdView from 'components/auth/resetpwd';

export default connect(null, { resetPwd, sendCaptcha })(ResetPwdView);
