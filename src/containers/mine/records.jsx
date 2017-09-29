import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearch } from 'helpers/history';

import { loadRecords } from 'actions/order';

import Tabs from 'components/mine/records/tabs';
import RecordsView from 'components/mine/records';

class Records extends Component {
  static defaultProps = {
    type: '',
  };

  static propTypes = {
    type: PropTypes.string,
    records: PropTypes.object.isRequired,
    loadRecords: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    props.loadRecords({ type: props.type });
  }

  render() {
    const { type, records } = this.props;
    return (
      <div>
        <Tabs type={type} />
        <RecordsView records={records} />
      </div>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    type: getSearch(props.location.search).type,
    records: state.getIn(['mine', 'records']),
  };
}

export default connect(mapStateToProps, { loadRecords })(Records);
