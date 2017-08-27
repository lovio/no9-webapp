import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import HeaderView from './header';
import RecommendView from './recommend';
import RecordListView from './recordList';

export default class Credit extends Component {
  static propTypes = {
    credit: PropTypes.number.isRequired,
    records: PropTypes.object.isRequired,
    getCreditRecords: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ minHeight: '100%', backgroundColor: '#F7F8FA' }}>
        <Helmet>
          <title>我的积分</title>
        </Helmet>

        <HeaderView credit={this.props.credit} />
        <RecommendView />
        <RecordListView
          records={this.props.records}
          getCreditRecords={this.props.getCreditRecords}
          pagination={this.props.pagination}
        />
      </div>
    );
  }
}

