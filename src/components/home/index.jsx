import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import BookActivity from 'components/common/bookActivity';
import ProfileView from '../common/profile';
import CapabilityTestView from './capabilityTest';
import TestsView from './tests';
import TagListView from './tags';

export default function HomeView({ user, latelyExercise, authorizedRedirect }) {
  return (
    <div>
      <Helmet>
        <title>智课斩托福</title>
      </Helmet>
      <ProfileView user={user} loggerEventDetailPrefix="HOME" />
      <CapabilityTestView user={user} latelyExercise={latelyExercise} />
      <TestsView />
      <BookActivity />
      <TagListView authorizedRedirect={authorizedRedirect} />
    </div>
  );
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  latelyExercise: PropTypes.object.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
