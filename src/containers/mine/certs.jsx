import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/auth';
import { loadCarports } from 'actions/extra';

import CertsView from 'components/mine/certs';

class Certs extends Component {
  static propTypes = {
    loadCarports: PropTypes.func.isRequired,
    carports: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    props.loadCarports();
    props.getUserInfo();
  }

  render() {
    const { carports, user, isLoading } = this.props;
    return (
      <div>
        <Helmet>
          <title>所有产权证书</title>
        </Helmet>
        <CertsView carports={carports} isLoading={isLoading} user={user} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    carports: state.getIn(['extra', 'carports', 'data']),
    isLoading: state.getIn(['extra', 'carports', 'isLoading']),
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, {
  loadCarports,
  getUserInfo,
})(Certs);
