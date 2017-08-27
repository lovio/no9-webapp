import { connect } from 'react-redux';
import { checkAccount } from 'actions/auth';
import BindView from 'components/bind';

// const selector = formValueSelector('Signin');

function mapStateToProps() {
  return {
    isEMail: true,
  };
}

export default connect(mapStateToProps, { checkAccount })(BindView);
