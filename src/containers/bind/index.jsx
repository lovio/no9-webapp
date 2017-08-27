import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAccount } from 'actions/auth';
import BindView from 'components/bind';
import { inApp } from 'helpers/ua';

class Bind extends Component {
  componentWillMount() {
    if (inApp) {
      location.href = 'mobile://signin';
    }
  }

  render() {
    return <BindView {...this.props} />;
  }
}

export default connect(null, { checkAccount })(Bind);
