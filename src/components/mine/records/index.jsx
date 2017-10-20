import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import AutoLoader from 'components/common/autoLoader';

import RecordItem from './record';

const Container = styled.div`width: 100%;`;

const Wrapper = styled.div`
  background-color: white;
  padding-left: 0.2rem;
`;

export default function RecordsView({ records, pagination, loadMoreRecords, type }) {
  return (
    <div>
      <Container>
        <AutoLoader pagination={pagination} loadMoreData={() => loadMoreRecords({ type })}>
          <Wrapper>{records.map(r => <RecordItem key={r.get('id')} record={r} />)}</Wrapper>
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
