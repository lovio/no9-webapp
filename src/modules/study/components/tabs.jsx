import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';

import { TabContainer, Tab } from 'ui/tabs';

export default function Tabs({ type }) {
  return (
    <TabContainer>
      <Tab
        onClick={() => history.replace('/study/stats')}
        active={type === 'stats'}
        name="学习统计"
      />
      <Tab
        onClick={() => history.replace('/study/records')}
        active={type === 'records'}
        name="学习记录"
      />
    </TabContainer>
  );
}

Tabs.propTypes = {
  type: PropTypes.string.isRequired,
};
