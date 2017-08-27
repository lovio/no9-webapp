import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImgTriangle from 'images/triangle.svg';
import ImgTriangleUp from 'images/triangle-up.svg';
import ImgTriangleDown from 'images/triangle-down.svg';

const Container = styled.div`
  height: 0.45rem;
  padding: 0 0.15rem;
  background-color: #F7F8FA;
`;

const Count = styled.p`
  margin: 0;
  font-size: 0.12rem;
  color: #8F9DA5;
  line-height: .45rem;
`;

const SortContainer = styled.div`
  float: right;
  span {
    display: inline-flex;
    align-items: center;
    font-size: 0.12rem;
    color: #2E3236;
    line-height: 0.45rem;
    svg {
      margin-left: 0.05rem;
      width: 0.06rem;
      height: 0.1rem;
    }
  }
  span:last-of-type {
    margin-left: 0.2rem;
  }
`;

// 口语写作没有难易
const TYPES = {
  1: ['name', 'difficulty'],
  2: ['name', 'difficulty'],
  3: ['name'],
  4: ['name'],
};

const TYPENAME = {
  name: '名称',
  difficulty: '难易程度',
};

const getTypeName = (type, sortType) => `${sortType === 'name' ? type : ''}${TYPENAME[sortType]}`;

export default function Filter(props) {
  const { count, isLoading, setSort, sortType, sortRule, subjectId, type, questionTypeId } = props;
  // 对于题型只有name
  const types = questionTypeId === '2' ? ['name'] : TYPES[subjectId];
  const unit = questionTypeId === '0' ? '套' : '题';
  return (
    <Container>
      <SortContainer>
        {
          types.map(typeName => (
            <span
              key={typeName}
              onClick={() => {
                if (!isLoading) {
                  setSort({ sortType: typeName });
                }
              }}
            >
              {getTypeName(type, typeName)}
              {
                typeName !== sortType && <ImgTriangle />
              }
              {
                typeName === sortType && sortRule === 'up' && <ImgTriangleUp />
              }
              {
                typeName === sortType && sortRule === 'down' && <ImgTriangleDown />
              }
            </span>
          ))
        }
      </SortContainer>
      <Count>共{count}{unit}</Count>
    </Container>
  );
}

Filter.defaultProps = {
  questionTypeId: '0',
};


Filter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  sortRule: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  questionTypeId: PropTypes.string,
};
