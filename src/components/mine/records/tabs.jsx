import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import includes from 'lodash-es/includes';
import map from 'lodash-es/map';
import styled from 'styled-components';
import { RECORD_TYPE_MAPPINGS } from 'constants/constants.json';

const Container = styled.div`
  height: 0.5rem;
  border-bottom: 1px solid #979797;
  display: flex;

  color: #4a4a4a;
  font-size: 0.14rem;
  line-height: 0.2rem;
  background-color: white;
`;

const Link = styled.p`
  text-align: center;
  width: 100%;
  ${(props) => {
    if (props.isActive) {
      return 'font-size: 0.18rem; color: #3FC4E6;line-height: 0.5rem;border-bottom: 0.02rem solid #0889FF';
    }
    return 'padding-top: 0.2rem;color: #4A4A4A';
  }};
`;

const TYPES = ['fee', 'allowance', 'withdraw'];

const Tabs = ({ type }) => (
  <Container>
    <Link
      isActive={!includes(TYPES, type)}
      onClick={() => {
        if (includes(TYPES, type)) {
          history.replace('/mine/records');
        }
      }}
    >
      <span>全部</span>
    </Link>
    {map(TYPES, recordType => (
      <Link
        key={recordType}
        isActive={type === recordType}
        onClick={() => {
          if (type !== recordType) {
            history.replace(`/mine/records?type=${recordType}`);
          }
        }}
      >
        <span>{RECORD_TYPE_MAPPINGS[recordType]}</span>
      </Link>
    ))}
  </Container>
);

Tabs.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Tabs;
