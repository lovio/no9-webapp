import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const Container = styled.div`width: 100%;`;

const Empty = styled.p`
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.16rem;
  line-height: 0.4rem;
  color: #4a4a4a;
`;

export default function RecordsView({ records }) {
  console.log(records);
  return (
    <div>
      <Helmet>
        <title>财务记录</title>
      </Helmet>
      <Container>
        <Empty>暂无任何交易记录</Empty>
      </Container>
    </div>
  );
}

RecordsView.propTypes = {
  records: PropTypes.object.isRequired,
};
