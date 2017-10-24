import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from 'components/common/wrapper';
import Loading from 'ui/loading';
import Empty from 'ui/empty';

import CertItem from './cert';

// 不够通用
export default function CertsView({ carports, isLoading, user }) {
  if (isLoading) {
    return <Loading />;
  }
  if (!carports.size) {
    return <Empty />;
  }
  return (
    <Wrapper>
      {carports.map(carport => <CertItem key={carport.get('id')} carport={carport} user={user} />)}
    </Wrapper>
  );
}

CertsView.propTypes = {
  carports: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};
