import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getTiUrl } from 'helpers/history';

import { Image } from 'ui';
import imgArrow from 'images/arrow.png';
import iconHard from 'images/icon-hard.png';
import iconMiddle from 'images/icon-middle.png';
import iconEasy from 'images/icon-easy.png';
import StatusBar from '../_statusBar';

const getImg = difficulty => ({
  1: iconEasy,
  2: iconMiddle,
  3: iconHard,
})[difficulty];

const Container = styled.div`
  background-color: #FFF;
  box-sizing: content-box;
  border-bottom: 0.01rem solid #EAEFF2;
  display: flex;
  align-items: center;
  padding-left: 0.15rem;
  padding-right: 0.05rem;

  p {
    flex: 1;
    margin: 0;
    /* TPO2 口语 Q1: */
    font-size: 0.14rem;
    color: #2E3236;
    padding: 0.1rem 0;
    line-height: 0.24rem;
  }
  img {
    margin: 0.1rem;
    width: 0.06rem;
    height: 0.09rem;
  }
`;

const Icon = styled(Image) `
  width: 0.14rem!important;
  height: 0.14rem!important;
  margin-left: 0!important;
  margin-right: 0.05rem;
`;


// 1 话题，2，题型
export default function Practice({ practice, type, authorizedRedirect }) {
  const subjectId = practice.get('subjectId');
  const answerCount = type === '1' ? practice.get('answerCount') : +(!!practice.get('answerId'));
  return (
    <Container
      id={practice.get('id')}
      onClick={() => {
        const practiceId = type === '1' ? practice.get('id') : '0';
        const questionId = type === '1' ? practice.get('nextQuestionId') : practice.get('id');
        if (practiceId && questionId) {
          const url = getTiUrl({
            subjectId,
            practiceId,
            questionId,
            status: practice.get('status'),
            exerciseId: practice.get('exerciseId'),
          });
          authorizedRedirect(url);
        }
      }}
    >
      {subjectId === 2 && type === '1' && (
        <Icon src={getImg(practice.get('difficulty'))} alt="" />
      ) }
      <p>{practice.get('name')}</p>
      <StatusBar
        subjectId={String(subjectId)}
        answerCount={answerCount}
        count={
          type === '1' ?
            practice.get('questionIds') && practice.get('questionIds').size
            : 1
        }
      />
      <Image src={imgArrow} alt="arrow" />
    </Container>
  );
}

Practice.propTypes = {
  practice: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
