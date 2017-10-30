import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RECORD_TYPE_MAPPINGS, RECORD_STATUS_MAPPING } from 'constants/constants.json';
import { dealNumber } from 'helpers/string';
import includes from 'lodash-es/includes';
import format from 'date-fns/format';

import imgFrozen from './frozen.png';

const Container = styled.div`
  background-color: white;
  padding: 0.08rem 0 0.1rem;
  border-bottom: 1px solid #dbdcdd;

  &:last-of-type {
    border: none;
  }
  ${props =>
    props.isFrozen &&
    `
  background-image: url('${imgFrozen}');
  background-size: 0.48rem 0.4rem;
  background-repeat: no-repeat;
  background-position: bottom right;
  `};
`;

const Row1 = styled.p`
  padding-right: 0.1rem;
  line-height: 0.3rem;
`;

const Type = styled.span`
  font-size: 0.18rem;
  color: #4a4a4a;
`;

const Amount = styled.span`
  float: right;
  font-size: 0.2rem;
  color: ${props => (props.isRed ? '#e01053' : '#0889FF')};
`;

const Row2 = styled.p`
  padding-right: 0.1rem;
  line-height: 0.2rem;
`;

const Time = styled.span`
  font-size: 0.12rem;
  color: #818b96;
`;

const Status = Time.extend`
  float: right;
`;

const redTypes = ['allowance', 'fee', 'paid'];
const minusTypes = ['debt', 'withdraw'];

const RecordItem = ({ record }) => (
  <Container isFrozen={record.get('isFrozen')}>
    <Row1>
      <Type>
        {RECORD_TYPE_MAPPINGS[record.get('type')]}
        {record.get('type') === 'withdraw' && `（尾号${record.getIn(['extra', 'cardNo']).substr(-4)}）`}
      </Type>
      <Amount isRed={includes(redTypes, record.get('type'))}>
        {includes(minusTypes, record.get('type')) ? '-' : ''} ￥{dealNumber(record.get('amount'))}
      </Amount>
    </Row1>
    <Row2>
      <Time>{format(new Date(record.get('createdAt')), 'YYYY-MM-DD HH:mm:ss')}</Time>
      <Status>{record.get('isFrozen') ? '被冻结' : RECORD_STATUS_MAPPING[record.get('status')]}</Status>
    </Row2>
  </Container>
);

RecordItem.propTypes = {
  record: PropTypes.object.isRequired,
};

export default RecordItem;
