import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import AutoLoader from 'components/common/autoLoader';

const Container = styled.div`width: 100%;`;

const Wrapper = ({ children }) => children;

export default function RecordsView({ records, pagination, loadMoreRecords, type }) {
  return (
    <div>
      <Helmet>
        <title>财务记录</title>
      </Helmet>
      <Container>
        <AutoLoader pagination={pagination} loadMoreData={() => loadMoreRecords({ type })}>
          <Wrapper>{records.map(r => <div key={r.get('id')}>{r.get('amount')}</div>)}</Wrapper>
        </AutoLoader>
      </Container>
    </div>
  );
}

RecordsView.propTypes = {
  records: PropTypes.object.isRequired,
  loadMoreRecords: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
