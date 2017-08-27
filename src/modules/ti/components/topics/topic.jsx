import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
import qs from 'qs';

import { Image } from 'ui';
import imgArrow from 'images/arrow.png';
import ProgressBar from '../_progressBar';

const Container = styled.div`
  background-color: #fff;
  margin-bottom: 0.1rem;
`;

const ItemContainer = styled.div`
  box-sizing: content-box;
  border-bottom: 0.01rem solid #eaeff2;
  display: flex;
  align-items: center;
  padding-right: 0.05rem;

  p {
    flex: 1;
    margin: 0;
    /* TPO2 口语 Q1: */
    font-size: 0.14rem;
    color: #8f9da5;
    padding: 0.1rem 0;
    padding-left: 0.15rem;
    line-height: 0.24rem;
  }
`;

const PracticeList = styled.div`border-bottom: 0.01rem solid #eaeff2;`;

const PkgTitle = styled.div`
  flex: 1;
  padding: 0.15rem 0;
  p {
    margin: 0;
  }
`;

const PkgName = styled.p`
  margin-bottom: 0.02rem;
  font-size: 0.14rem;
  color: #2e3236;
  line-height: 0.2rem;
`;

const PkgDesc = styled.p`
  font-size: 0.12rem;
  color: #8f9da5;
  line-height: 0.18rem;
`;

const SubItemContainer = styled.div`
  box-sizing: content-box;
  border-bottom: 0.01rem solid #eaeff2;
  display: flex;
  align-items: center;
  padding: 0 0.15rem;

  img {
    margin-left: 0.1rem;
    width: 0.06rem;
    height: 0.09rem;
  }
`;

const Title = styled.div`
  flex: 1;

  p {
    margin: 0;
  }

  p:nth-of-type(1) {
    color: #2e3236;
    line-height: 0.24rem;
    font-size: 0.14rem;
  }
  p:nth-of-type(2) {
    font-size: 0.12rem;
    line-height: 0.16rem;
    color: #8f9da5;
  }
`;

export default function Topic({ topic, type }) {
  return (
    <Container id={topic.get('id')}>
      {topic.has('name') &&
        <ItemContainer>
          <p>
            {topic.get('name')}
          </p>
        </ItemContainer>}
      <PracticeList>
        {topic.get('tags').map(tag =>
          <SubItemContainer
            key={tag.get('id')}
            onClick={() => {
              const subjectId = tag.get('subjectId');
              // 这里要特别注意，详情页需要的字段questionTypeId，实际上是type
              // questionType 对应 话题与题型   typeId对应字段里的questionTypeId
              const typeId = tag.get('questionTypeId');
              const questionTypeId = type;
              history.push(
                `/ti/${subjectId}/topics/${tag.get('id')}?${qs.stringify({
                  questionTypeId,
                  typeId,
                })}`,
              );
            }}
          >
            <Title>
              <PkgTitle>
                <PkgName>
                  {tag.get('name')}
                </PkgName>
                <PkgDesc>
                  {tag.get('userCount')}人做过，{tag.get('subjectId') === 3
                    ? `平均分${tag.get('averageScore') || ''}`
                    : `平均正确率${(tag.get('correctRate') || 0) * 100}%`}
                </PkgDesc>
              </PkgTitle>
              {/* { isNumber(tag.get('answerCount')) &&
                <p>
                  已做{tag.get('answerCount')}共{tag.get('count')}题
                </p>} */}
            </Title>
            <ProgressBar rate={`${tag.get('progress') || 0}`} />
            <Image src={imgArrow} alt="arrow" />
          </SubItemContainer>,
        )}
      </PracticeList>
    </Container>
  );
}

Topic.propTypes = {
  topic: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
