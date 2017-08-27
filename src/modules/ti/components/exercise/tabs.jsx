import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';

import { TabContainer, Tab } from 'ui/tabs';

export default function Tabs({ subjectId, textbookId, tabs }) {
  return (
    <TabContainer
      type={tabs.size > 4 && 'overflow'}
    >
      {
        tabs.map(tab => (
          <Tab
            key={tab.get('id')}
            onClick={() => history.replace(`/ti/${subjectId}/exercise?textbookId=${tab.get('id')}`)}
            active={+textbookId === tab.get('id')}
            name={tab.get('name')}
          />
        ))
      }
    </TabContainer>
  );
}

Tabs.propTypes = {
  subjectId: PropTypes.string.isRequired,
  textbookId: PropTypes.string.isRequired,
  tabs: PropTypes.object.isRequired,
};
