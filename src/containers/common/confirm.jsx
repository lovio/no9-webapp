import { connect } from 'react-redux';
import { hideConfirm, handleConfirm } from 'actions/common';
import Confirm from 'components/common/confirm';

function mapStateToProps(state) {
  return {
    confirm: state.getIn(['common', 'confirm']),
  };
}

export default connect(mapStateToProps, {
  hideConfirm,
  handleConfirm,
})(Confirm);
