import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearch } from 'helpers/history';

import { loadRecords, loadMoreRecords } from 'actions/order';

import Tabs from 'components/mine/records/tabs';
import RecordsView from 'components/mine/records';

import { Artboard, Container, Overflow } from 'ui';

class Records extends Component {
  static defaultProps = {
    type: '',
  };

  static propTypes = {
    type: PropTypes.string,
    records: PropTypes.object.isRequired,
    loadRecords: PropTypes.func.isRequired,
    loadMoreRecords: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    props.loadRecords({ type: props.type });
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.props.loadRecords({ type: this.props.type });
    }
  }

  render() {
    const { type, records, pagination } = this.props;
    return (
      <Artboard>
        <Container>
          <Tabs type={type} />
          <Overflow>
            <RecordsView
              records={records}
              pagination={pagination}
              loadMoreRecords={this.props.loadMoreRecords}
              type={type}
            />
          </Overflow>
        </Container>
      </Artboard>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    type: getSearch(props.location.search).type || '',
    records: state.getIn(['mine', 'records']),
    pagination: state.getIn(['pagination', 'records']),
  };
}

export default connect(mapStateToProps, { loadRecords, loadMoreRecords })(Records);
