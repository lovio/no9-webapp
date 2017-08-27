import React from 'react';
import PropTypes from 'prop-types';
import history from 'helpers/history';
import styled from 'styled-components';

import { Image } from 'ui';
import { getTestTitle, getTypeBySubjectId } from 'helpers/fieldMappings';
import imgArrow from 'images/arrow.png';
import imgSpeakingExercise from 'images/speaking-exercise.png';
import imgSpeakingTopics from 'images/speaking-topics.png';
import imgListeningExercise from 'images/listening-exercise.png';
import imgListeningTypes from 'images/listening-types.png';
import imgListeningTopics from 'images/listening-topics.png';
import imgReadingExercise from 'images/reading-exercise.png';
import imgReadingTypes from 'images/reading-types.png';
import imgReadingTopics from 'images/reading-topics.png';
import imgWritingExercise from 'images/writing-exercise.png';
import imgWritingTopics from 'images/writing-topics.png';
import { log } from 'helpers/logger';

const LIST = {
  1: [
    {
      eventDetail: 'READTYPE_EXAM',
      img: imgReadingExercise,
      type: 'exercise',
    },
    {
      eventDetail: 'READTYPE_TYPE',
      img: imgReadingTypes,
      // 题型练习
      type: 'types',
    },
    {
      eventDetail: 'READTYPE_TOPIC',
      img: imgReadingTopics,
      type: 'topics',
    },
  ],
  2: [
    {
      eventDetail: 'LISTENTYPE_EXAM',
      img: imgListeningExercise,
      type: 'exercise',
    },
    {
      eventDetail: 'LISTENTYPE_TYPE',
      img: imgListeningTypes,
      // 题型练习
      type: 'types',
    },
    {
      eventDetail: 'LISTENTYPE_TOPIC',
      img: imgListeningTopics,
      type: 'topics',
    },
  ],
  3: [
    {
      eventDetail: 'TALKTYPE_EXAM',
      img: imgSpeakingExercise,
      type: 'exercise',
    },
    {
      eventDetail: 'TALKTYPE_TOPIC',
      img: imgSpeakingTopics,
      type: 'topics',
    },
  ],
  4: [
    {
      eventDetail: 'WRITEYPE_EXAM',
      img: imgWritingExercise,
      type: 'exercise',
    },
    {
      eventDetail: 'WRITETYPE_TOPIC',
      img: imgWritingTopics,
      type: 'topics',
    },
  ],
};

const TITLE_MAPPINGS = {
  exercise: '真题',
  types: '题型',
  topics: '话题',
};

const COUNT_KEY = {
  exercise: 'questionPackageCount',
  types: 'questionTypeCount',
  topics: 'topicCount',
};

const Container = styled.div`
  margin-top: 0.1rem;
  padding: 0 0.15rem;
`;

const ExerciseContainer = styled.div`
  margin-bottom: 0.1rem;
  background-color: white;
  height: 0.98rem;
  /* Mask: */
  box-shadow: 0 0.02rem 0.04rem 0 rgba(0,0,0,0.05);

  display: flex;
  align-items: center;
  border-radius: 0.02rem;

  img:nth-of-type(1) {
    width: 0.55rem;
    height: 0.55rem;
    margin-left: 0.24rem;
  }

  img:nth-of-type(2) {
    width: 0.06rem;
    height: 0.09rem;
    margin-right: 0.2rem;
  }
`;

const Title = styled.div`
  flex: 1;
  padding-left: 0.24rem;

  p:nth-of-type(1) {
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #2E3236;
    margin-bottom: 0.06rem;
  }

  p:nth-of-type(2) {
    font-size: 0.12rem;
    color: #8F9DA5;
    line-height: 0.14rem;
  }
`;

export default function Exercise({ subjectId, counts }) {
  const type = getTypeBySubjectId(subjectId);
  const title = getTestTitle(type);
  return (
    <Container>
      {
        LIST[subjectId].map(item => (
          <ExerciseContainer
            key={item.type}
            onClick={() => {
              log({ eventDetail: item.eventDetail });
              let link = `/ti/${subjectId}/${item.type === 'types' ? 'topics' : item.type}`;
              if (item.type === 'types') {
                link += '?type=2';
              }
              history.push(link);
            }}
          >
            <Image src={item.img} alt="exercise" />
            <Title>
              <p>{title}{TITLE_MAPPINGS[item.type]}练习</p>
              <p>包含{counts.get(COUNT_KEY[item.type])}套练习</p>
            </Title>
            <Image src={imgArrow} alt="exercise" />
          </ExerciseContainer>
        ))
      }
    </Container>
  );
}

Exercise.propTypes = {
  subjectId: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
};
