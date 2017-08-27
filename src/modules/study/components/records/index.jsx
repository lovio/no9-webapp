import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Immutable from 'immutable';

import Empty from 'ui/empty';

import Calendar from './calendar';
import StatusBar from './statusBar';

export default function RecordsView({ date, records }) {
  const isLoading = records.get('isLoading');
  const dateRecords = records.getIn(['data', date]) || Immutable.List();
  return (
    <div>
      <Helmet>
        <title>我的学习记录</title>
      </Helmet>
      <Calendar date={date} />
      {
        isLoading && (
          <Empty type="isLoading" />
        )
      }
      <div>
        {
          !isLoading && !!dateRecords.size && dateRecords.map(record => (
            <StatusBar key={record.get('id')} record={record} />
          ))
        }
        {
          !isLoading && !dateRecords.size && (
            <Empty type="no-content" />
          )
        }
      </div>
    </div>
  );
}

RecordsView.propTypes = {
  date: PropTypes.string.isRequired,
  records: PropTypes.object.isRequired,
};
