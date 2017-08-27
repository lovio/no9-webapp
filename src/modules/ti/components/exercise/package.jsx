import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getTiUrl } from 'helpers/history';
import includes from 'lodash-es/includes';

import { Image } from 'ui';
import imgArrow from 'images/arrow.png';
import iconHard from 'images/icon-hard.png';
import iconMiddle from 'images/icon-middle.png';
import iconEasy from 'images/icon-easy.png';
import ProgressBar from '../_progressBar';
import StatusBar from '../_statusBar';

const getImg = difficulty => ({
  1: iconEasy,
  2: iconMiddle,
  3: iconHard,
})[difficulty];

const Container = styled.div`
  background-color: #FFF;
`;

const ItemContainer = styled.div`
  box-sizing: content-box;
  border-bottom: 0.01rem solid #EAEFF2;
  display: flex;
  align-items: center;
  padding-right: 0.05rem;

  img {
    margin: 0.1rem;
    width: 0.06rem;
    height: 0.09rem;
  }

  img:last-of-type{
    ${props => !props.isFolding && 'transform: rotate(90deg);'}
  }
`;

const PkgTitle = styled.div`
  flex: 1;
  padding: 0.15rem;
  p {
    margin: 0;
  }
`;

const PkgName = styled.p`
  margin-bottom: 0.02rem;
  font-size: 0.14rem;
  color: #2E3236;
  line-height: 0.2rem;
`;

const PkgDesc = styled.p`
  font-size: 0.12rem;
  color: #8F9DA5;
  line-height: 0.18rem;
`;

const PracticeList = styled.div`
  border-bottom: 0.01rem solid #EAEFF2;

  div:last-of-type {
    border: none;
  }

`;

const SubItemContainer = styled.div`
  box-sizing: content-box;
  border-bottom: 0.01rem solid #EAEFF2;
  display: flex;
  align-items: center;
  margin: 0 0.15rem;

  p {
    flex: 1;
    margin: 0;
    padding: 0.1rem 0;
    line-height: 0.24rem;
    /* TPO2 口语 Q1: */
    font-size: 0.14rem;
    color: #2E3236;
  }

  img {
    margin-left: 0.1rem;
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

export default function Package({ pkg, choosePackage, packageId, subjectId, authorizedRedirect }) {
  const pkgId = `${pkg.get('id')}`;
  const isFolding = pkgId !== packageId;
  return (
    <Container id={pkg.get('id')}>
      <ItemContainer
        onClick={() => choosePackage(isFolding ? pkgId : '')}
        isFolding={isFolding}
      >
        <PkgTitle>
          <PkgName>{pkg.get('name')}</PkgName>
          <PkgDesc>
            {pkg.get('userCount')}人做过，{
              subjectId === '3' ? `平均${pkg.get('averageScore') || ''}分` : `平均正确率${(pkg.get('correctRate') || 0) * 100}%`
            }
          </PkgDesc>
        </PkgTitle>
        <ProgressBar rate={`${pkg.get('progress')}`} />
        <Image src={imgArrow} alt="arrow" />
      </ItemContainer>
      {
        packageId === `${pkg.get('id')}` && (
          <PracticeList>
            {
              pkg.has('practice') && pkg.get('practice').map(practice => (
                <SubItemContainer
                  key={practice.get('id')}
                  onClick={() => {
                    const practiceId = practice.get('id');
                    const questionId = practice.get('nextQuestionId');
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
                  {/* 口语和写作没有难易 */}
                  { includes([1, 2], practice.get('subjectId')) && (
                    <Icon src={getImg(practice.get('difficulty'))} alt="" />
                  ) }
                  <p>{practice.get('name')}</p>
                  <StatusBar
                    subjectId={subjectId}
                    answerCount={practice.get('answerCount')}
                    count={practice.get('questionIds') && practice.get('questionIds').size}
                  />
                  <Image src={imgArrow} alt="arrow" />
                </SubItemContainer>
              ))
            }
          </PracticeList>
        )
      }
    </Container>
  );
}

Package.propTypes = {
  packageId: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  pkg: PropTypes.object.isRequired,
  choosePackage: PropTypes.func.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
