import { connect } from 'react-redux';
import { loadCities, loadZones, loadCarports } from 'actions/extra';

import ZonesView from '../../components/zone';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.hasIn(['user', 'token']),
    cities: state.getIn(['extra', 'cities']),
    zones: state.getIn(['extra', 'zones']),
    carports: state.getIn(['extra', 'carports']),
  };
}

export default connect(mapStateToProps, {
  loadCities,
  loadZones,
  loadCarports,
})(ZonesView);
