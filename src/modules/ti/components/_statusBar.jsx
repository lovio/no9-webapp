import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import includes from 'lodash-es/includes';

import { getSubjectId } from 'helpers/fieldMappings';

import imgListening from 'images/ti/icon-listening.png';
import imgReading from 'images/ti/icon-reading.png';
import imgWriting from 'images/ti/icon-writing.png';
import imgSpeaking from 'images/ti/icon-speaking.png';

const getImg = subjectId => ({
  1: imgReading,
  2: imgListening,
  3: imgSpeaking,
  4: imgWriting,
})[subjectId];

// 这里写的不好
const Icon = styled.img`
  margin: 0!important;
  width: 0.12rem!important;
  height: 0.12rem!important;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.1rem;

  span {
    margin-left: 0.05rem;
    font-size: 0.11rem;
    color: #8F9DA5;
    letter-spacing: 0;
    line-height: 0.44rem;
  }
`;

export default function StatusBar({ subjectId, count, answerCount }) {
  if (!answerCount) {
    return null;
  }
  return (
    <Container>
      <Icon src={getImg(subjectId)} alt="" />
      <span>
        {
          includes([getSubjectId('speaking')], +subjectId) ?
            ` x ${answerCount}` :
            `${answerCount}/${count}`
        }
      </span>
    </Container>
  );
}

StatusBar.propTypes = {
  count: PropTypes.number,
  answerCount: PropTypes.number,
  subjectId: PropTypes.string.isRequired,
};

StatusBar.defaultProps = {
  count: 0,
  answerCount: 0,
};
