import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { dealNumber } from 'helpers/string';

const Container = styled.div`
  background-color: #1a1515;
  height: 1.7rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: white;
`;

const Box = styled.div`
  padding: 0.2rem 0;
`;

const Title = styled.span``;

const Count = styled.span`
  float: right;
`;

const BoxTitle = styled.p``;

const BarBox = styled.div`
  height: 0.1rem;
  border-radius: 0.1rem;
  background-color: grey;
  display: flex;
`;

const Bar = styled.div`
  display: inline-block;
  border-radius: 0.1rem;

  width: ${props => props.width};
  background-color: #${props => props.color};
  height: 0.1rem;
`;

const gradeMappings = {
  0: {
    amount: 6500,
    count: 1,
  },
  1: {
    amount: 10000000,
    count: 2,
  },
  2: {
    amount: 20000000,
    count: 5,
  },
  3: {
    amount: 50000000,
    count: 10,
  },
  4: {
    amount: 100000000,
    count: 50,
  },
  5: {
    amount: 9999999900,
    count: 9999,
  },
};

const LevelUp = ({ levelups }) => {
  const data = levelups.get('data');

  const grade = gradeMappings[data.get('grade') || 0];
  console.log(data.toJS(), grade);
  return (
    <Container>
      <Box>
        <BoxTitle>
          <Title>升级所需单数</Title>
          <Count>{grade.count}</Count>
        </BoxTitle>
        <BarBox>
          <Bar color="9eb8dd" width={`${data.get('count') / grade.count * 100}%`} />
        </BarBox>
      </Box>
      <Box>
        <BoxTitle>
          <Title>升级所需金额</Title>
          <Count>￥{dealNumber(grade.amount)}</Count>
        </BoxTitle>
        <BarBox>
          <Bar color="ecd3d6" width={`${data.get('amount') / grade.amount * 100}%`} />
        </BarBox>
      </Box>
    </Container>
  );
};

LevelUp.propTypes = {
  levelups: PropTypes.object.isRequired,
};

export default LevelUp;
