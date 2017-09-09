// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from 'actions/auth';

import MineView from 'components/mine';

// class Mine extends Component {
//   static propTypes = {};
//   componentDidMount() {}

//   render() {
//     return <MineView {...this.props} />;
//   }
// }

function mapStateToProps(state) {
  return {
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, {
  signOut,
})(MineView);
