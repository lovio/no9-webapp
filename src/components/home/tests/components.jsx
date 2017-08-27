import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
import { getTestTitle, getSubjectId } from 'helpers/fieldMappings';
import { log, getEventDetailBySubject } from 'helpers/logger';

import IconReading from 'images/reading.svg';
import IconSpeaking from 'images/speaking.svg';
import IconListening from 'images/listening.svg';
import IconWriting from 'images/writing.svg';

const border = '0.01rem solid #EAEFF2';

export const Container = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;

  section:first-of-type {
    border-right: ${border};
    border-bottom: ${border};
  }

  section:nth-of-type(2) {
    border-bottom: ${border};
  }

  section:nth-of-type(3) {
    border-right: ${border};
  }
`;

const TestItemContainer = styled.section`
  width: 50%;
  padding: 0.17rem 0 0.2rem 0.3rem;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  border-radius: 9999px;
  border: 0.02rem solid #58676F;
  float: left;
  width: 0.32rem;
  height: 0.32rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 0.14rem;
    height: 0.14rem;
  }
`;

const Desc = styled.div`
  flex: 1;
  margin-left: 0.1rem;

  p {
    letter-spacing: 0;
  }

  p:first-of-type {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #2E3236;
  }

  p:last-of-type {
    margin-top: 0.01rem;
    font-size: 0.11rem;
    line-height:0.14rem;
    color: #8F9DA5;
  }
`;

export function TestItem({ type, count, isAvailable }) {
  return (
    <TestItemContainer
      onClick={() => {
        log({ eventDetail: getEventDetailBySubject('HOME_MIDDLE', type) });
        history.push(`/ti/${getSubjectId(type)}`);
      }}
    >
      <IconContainer>
        { type === 'reading' && <IconReading />}
        { type === 'speaking' && <IconSpeaking />}
        { type === 'listening' && <IconListening />}
        { type === 'writing' && <IconWriting />}
      </IconContainer>
      <Desc>
        <p>{getTestTitle(type)}练习</p>
        <p>{ isAvailable ? `${count}人正在练习` : '正在建设中' }</p>
      </Desc>
    </TestItemContainer>
  );
}

TestItem.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number,
  isAvailable: PropTypes.bool,
};

TestItem.defaultProps = {
  isAvailable: false,
  count: 0,
};
