import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as uaHelper from 'helpers/ua';
import { getTypeNameBySubjectId } from 'helpers/fieldMappings';
import { log } from 'helpers/logger';
import history from 'helpers/history';
import imgIsLoading from 'images/loading.gif';
import { Button } from 'ui';

import { universalLink } from '../../../config.json';

const iosLink = `${universalLink}?from=weixin`;

const Container = styled.div`
  background-color: #FFFFFF;
  padding: 0.1rem 0;
  text-align: center;

  a {
    text-decoration: none;
  }
`;

const Desc = styled.p`
  margin: 0.1rem 0 0.1rem;
  font-size: 0.12rem;
  color: #2E3236;
  letter-spacing: 0;
`;

const Btn = styled(Button)`
  margin-bottom: 0.1rem;
  width: 1.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 9999px;
  letter-spacing: 0;
`;

const Title = styled.div`
  margin-top: 0.02rem;
  margin-bottom: 0.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #2E3236;
  letter-spacing: 0;
`;

const Result = styled.div`
  display: inline-block;
  span {
    font-size: 0.12rem;
    line-height: 0.18rem;
    color: #8F9DA5;
    letter-spacing: 0;
    margin: 0 0.1rem;
  }
`;

const Report = styled.div`
  height: 0.24rem;
  margin-top: 0.12rem;
  margin-bottom: 0.05rem;
  span {
    display: inline-block;
    font-size: 0.11rem;
    line-height: 0.24rem;
    height: 0.24rem;
    color: #FFFFFF;
    letter-spacing: 0;
    /* Rectangle: */
    background: #FE663B;
    border-radius: 9999px;
    width: 1rem;
  }
`;

const LoadingImg = styled.img`
  margin: 0.2rem 0;
  width: 0.3rem;
  height: 0.3rem;
`;

const LinkMore = styled.p`
  display: inline-block;
  width: 1rem;
  background: #FFFFFF;
  border: 0.01rem solid #8F9DA5;
  border-radius: 9999px;
  text-align: center;
  height: 0.24rem;
  line-height: 0.22rem;
  font-size: 0.11rem;
  color: #2E3236;
  letter-spacing: 0;
`;

function CapabilityTest({ user, latelyExercise }) {
  const capabilityTest = user.get('capabilityTest');
  const token = user.getIn(['info', 'token']);
  if (token && (capabilityTest.get('isLoading') || latelyExercise.get('isLoading'))) {
    return (
      <Container>
        <LoadingImg src={imgIsLoading} alt="loading" />
      </Container>
    );
  }
  // 已做测试
  if (token && capabilityTest.get('data').size) {
    const isBooked = capabilityTest.getIn(['data', 0, 'isBooked']);
    if (isBooked) {
      // 如果有练习，那么就显示练习
      if (latelyExercise.get('data').size) {
        return (
          <Container>
            <Title>{latelyExercise.getIn(['data', 'name'])}</Title>
            <LinkMore onClick={() => history.push('/study/records')}>查看更多练习</LinkMore>
          </Container>
        );
      }
      return null;
    }
    const ids = capabilityTest.get('data').map(item => item.get('id')).join(',');
    return (
      <Container>
        <Title>托福能力测试</Title>
        <Result>
          {
            capabilityTest.get('data').map(item => (
              <span key={item.get('id')}>
                {getTypeNameBySubjectId(item.get('subject'))}:{item.get('ability')}
              </span>
            ))
          }
        </Result>
        <Report>
          <span
            onClick={
              () => {
                if (uaHelper.inAndroid) {
                  location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.smartstudy.zhantoefl';
                } else {
                  location.href = `${iosLink}&route=book&ids=${ids}`;
                }
              }
            }
          >
            预约报告解读
          </span>
        </Report>
      </Container>
    );
  }
  // 没做测试
  return (
    <Container>
      <Desc>5分钟了解你的托福水平，开始测试！</Desc>
      <Btn
        onClick={
          () => {
            log({ eventDetail: 'HOME_TEST' });
            if (uaHelper.inAndroid) {
              location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.smartstudy.zhantoefl';
            } else {
              location.href = `${iosLink}&route=test`;
            }
          }
        }
      >托福测试</Btn>
    </Container>
  );
}

CapabilityTest.propTypes = {
  user: PropTypes.object.isRequired,
  latelyExercise: PropTypes.object.isRequired,
};

export default CapabilityTest;
