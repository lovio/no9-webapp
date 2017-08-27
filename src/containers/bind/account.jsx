import { connect } from 'react-redux';
import AccountView from 'components/bind/account';
import { bindAccount, bindAccountConflict } from 'actions/auth';

export default connect(null, { bindAccount, bindAccountConflict })(AccountView);
