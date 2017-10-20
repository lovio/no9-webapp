import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getSearch } from 'helpers/history';
import { getUserInfo } from 'actions/auth';

import { loadRecords, loadMoreRecords } from 'actions/order';

import RecordsView from 'components/mine/records';
import Tabs from 'components/mine/records/tabs';
import Summary from 'components/mine/records/summary';

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
    user: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    props.loadRecords({ type: props.type });

    props.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.props.loadRecords({ type: this.props.type });
    }
  }

  render() {
    const { type, records, pagination, user } = this.props;
    return (
      <Artboard>
        <Helmet>
          <title>交易记录</title>
        </Helmet>
        <Container>
          <Tabs type={type} />
          {type === '' && <Summary user={user} />}
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
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, { loadRecords, loadMoreRecords, getUserInfo })(Records);
