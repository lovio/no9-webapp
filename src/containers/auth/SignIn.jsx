import { connect } from 'react-redux';
import { sendCaptcha, signIn } from 'actions/auth';
import SignInView from 'components/auth/signIn';

export default connect(null, { signIn, sendCaptcha })(SignInView);
