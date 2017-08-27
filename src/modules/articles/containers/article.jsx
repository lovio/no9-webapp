// article 63920
import React from 'react';
import PropTypes from 'prop-types';
import Empty from 'ui/empty';

import A63920 from '../components/63920';
import A44565 from '../components/44565';
import A69126 from '../components/69126';

const id2Components = {
  63920: A63920,
  44565: A44565,
  69126: A69126,
};

export default function Article({ match: { params } }) {
  const element = id2Components[params.id];
  if (!element) {
    return <Empty type="no-content" />;
  }
  return React.createElement(element);
}

Article.propTypes = {
  match: PropTypes.object.isRequired,
};
