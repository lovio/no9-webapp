import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal, hideToastItem } from 'actions/common';
import ToastsView from 'components/common/toasts';
import Modal from 'components/common/modal';

class Tips extends Component {
  static propTypes = {
    toasts: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
    hideToastItem: PropTypes.func.isRequired,
  };

  renderToasts = toasts => <ToastsView toasts={toasts} hideToastItem={this.props.hideToastItem} />;

  render() {
    const { modal, toasts } = this.props;
    return (
      <div>
        {this.renderToasts(toasts)}
        {modal.has('type') && <Modal modal={modal} hideModal={this.props.hideModal} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    toasts: state.getIn(['common', 'toasts']),
    modal: state.getIn(['common', 'modal']),
  };
}

export default connect(mapStateToProps, {
  hideModal,
  hideToastItem,
})(Tips);
