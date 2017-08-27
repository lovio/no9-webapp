import { connect } from 'react-redux';
import { unbindAccount } from 'actions/auth';
import UnbindView from 'components/bind/unbind';

// const selector = formValueSelector('Signin');

function mapStateToProps(state) {
  return {
    unbind: state.getIn(['user', 'unbind']),
  };
}

export default connect(mapStateToProps, { unbindAccount })(UnbindView);
