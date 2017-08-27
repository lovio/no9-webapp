import React from 'react';
import Helmet from 'react-helmet';

import Empty from 'ui/empty';

export default function StatsView() {
  return (
    <div>
      <Helmet>
        <title>我的学习统计</title>
      </Helmet>
      <Empty />
    </div>
  );
}

StatsView.propTypes = {
};
