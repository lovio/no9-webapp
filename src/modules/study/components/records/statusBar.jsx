import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import format from 'date-fns/format';
import includes from 'lodash-es/includes';

import { getTiUrl } from 'helpers/history';
import { getSubjectId } from 'helpers/fieldMappings';
import { Image } from 'ui';
import imgArrow from 'images/arrow.png';
import iconSpeaking from 'images/study/speaking.png';
import iconReading from 'images/study/reading.png';
import iconWriting from 'images/study/writing.png';
import iconListening from 'images/study/listening.png';

const iconSubjectIdMapping = {
  1: iconReading,
  2: iconListening,
  3: iconSpeaking,
  4: iconWriting,
};

const Container = styled.div`
  width: 100%;
  background-color: #FFF;
  box-sizing: content-box;
  display: flex;
  border-bottom: 0.01rem solid #EAEFF2;
  align-items: center;
  overflow-x: hidden;

  img {
    margin: 0.15rem;
    width: 0.06rem;
    height: 0.09rem;
  }
`;

const Time = styled.div`
  width: 0.67rem;
`;

const PlaceHolder = styled.div`
  width: 0.61rem;
  border-right: 0.01rem solid #EAEFF2;
  height: 0.31rem;
`;

const TimeClock = styled.div`
  width: 0.67rem;
  font-size: 0.11rem;
  color: #2E3236;
  letter-spacing: 0;
  line-height: 0.14rem;
  height: 0.14rem;
  padding-left: 0.15rem;
  background-image: url('${props => iconSubjectIdMapping[props.subjectId || 3]}');
  background-repeat: no-repeat;
  background-size: 0.14rem 0.14rem;
  background-position: right;
`;

const Content = styled.div`
  padding: 0.16rem 0 0.16rem 0.15rem;
  flex: 1;
  overflow: hidden;
`;

const Title = styled.p`
  font-size: 0.14rem;
  color: #2E3236;
  letter-spacing: 0;
  line-height: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
`;

const Status = styled.p`
  font-size: 0.12rem;
  color: #8F9DA5;
  margin-top: 0.04rem;
  letter-spacing: 0;
  line-height: 0.2rem;

  span {
    color: #FE663B;
  }
`;

// 口语和写作有机器批改
export default function StatusBar({ record }) {
  // machinePigaiStatus 0 未提交  1 批改中  2 批改成功 3 打分失败
  // status代表状态，0未完成，1完成
  const status = record.get('status');
  const machinePigaiStatus = record.get('machinePigaiStatus');
  const isSpeakingAndWriting = includes([getSubjectId('speaking'), getSubjectId('writing')], record.get('subjectId'));
  return (
    <Container
      onClick={() => {
        const url = getTiUrl({
          subjectId: record.get('subjectId'),
          practiceId: record.get('practiceId'),
          questionId: record.get('questionId'),
          status: record.get('status'),
          exerciseId: record.get('id'),
          type: 'records',
        });
        location.assign(url);
      }}
    >
      <Time>
        <PlaceHolder />
        <TimeClock subjectId={record.get('subjectId')}>{format(new Date(record.get('createdAt')), 'HH:mm')}</TimeClock>
        <PlaceHolder />
      </Time>
      <Content>
        <Title>{record.get('referName')}</Title>
        {
          status === 1 && isSpeakingAndWriting && machinePigaiStatus === 2 && (
            <Status>
              预测得分 <span>{record.get('machinePigaiScore') || 0}</span> / 30分
            </Status>
          )
        }
        {
          status === 1 && isSpeakingAndWriting && includes([0, 1], machinePigaiStatus) && (
            <Status>
              { machinePigaiStatus === 0 && '未提交'}
              { machinePigaiStatus === 1 && '打分中'}
            </Status>
          )
        }
        {
          status === 1 && isSpeakingAndWriting && machinePigaiStatus === 3 && (
            <Status>
              打分失败 <span>重新打分</span>
            </Status>
          )
        }
        {
          status === 1 && !isSpeakingAndWriting && (
            <Status>
              正确率 {(record.get('correctRate') * 100).toFixed(0)} %
            </Status>
          )
        }
      </Content>
      <Image src={imgArrow} alt="arrow" />
    </Container>
  );
}

StatusBar.propTypes = {
  record: PropTypes.object.isRequired,
};
