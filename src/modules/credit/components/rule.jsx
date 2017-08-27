import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Image } from 'ui';

import imgCredits from 'images/credits.png';

export const RuleList = styled.div`
  padding: 0.15rem;
`;

export const Rule = styled.div`
  margin-top: 0.3rem;

  &:first-of-type {
    margin-top: 0;
  }
`;

export const Question = styled.div`
  position: relative;
  padding-left: 0.25rem;
`;

export const QuestionIcon = styled.span`
  position: absolute;
  left: 0;
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  background-color: #FC6744;
  color: #fff;
  text-align: center;
  border-radius: 0.18rem;
  font-size: 0.1rem;
  line-height: 0.18rem;
  vertical-align: text-top;
`;

export const QuestionText = styled.div`
  font-size: 0.14rem;
  line-height: 0.18rem;
  color: #FC6744;
  font-weight: bold;
  vertical-align: text-top;
`;

export const Answer = styled.div`
  position: relative;
  margin-top: 0.1rem;
  padding-left: 0.25rem;
`;

export const AnswerIcon = styled.div`
  position: absolute;
  left: 0;
  display: inline-block;
  width: 0.18rem;
  height: 0.18rem;
  background-color: #8F9DA4;
  color: #fff;
  text-align: center;
  border-radius: 0.18rem;
  font-size: 0.1rem;
  line-height: 0.18rem;
  vertical-align: text-top;
`;

export const AnswerText = styled.div`
  font-size: 0.14rem;
  line-height: 0.18rem;
  vertical-align: text-top;
`;

export const AnswerTable = styled.div`
  margin-top: 0.15rem;
  border: 1px solid #EAEFF2;
`;

export const Row = styled.div`
  display: flex;
  border-top: 1px solid #EAEFF2;

  &:first-of-type {
    border-top: none;
  }
`;

export const Col = styled.div`
  flex: 1;
  height: 0.45rem;
  line-height: 0.45rem;
  text-align: center;
  border-left: 1px solid #EAEFF2;
  font-size: 0.12rem;

  &:first-of-type {
    border-left: none;
  }

  img {
    height: 0.15rem;
    margin-left: 0.05rem;
    vertical-align: -0.03rem;
  }
`;

export default class Header extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ minHeight: '100%', backgroundColor: '#fff' }}>
        <Helmet>
          <title>积分规则</title>
        </Helmet>

        <RuleList>
          <Rule>
            <Question>
              <QuestionIcon>Q</QuestionIcon>
              <QuestionText>斩托福积分怎么获取？</QuestionText>
            </Question>
            <Answer>
              <AnswerIcon>A</AnswerIcon>
              <AnswerText>目前积分获取的主要方见下表：</AnswerText>
              <AnswerTable>
                <Row style={{ backgroundColor: '#F7F8FA', color: '#93A0A7' }}>
                  <Col>获取条件</Col>
                  <Col>对应积分</Col>
                </Row>
                <Row>
                  <Col>完成水平测试</Col>
                  <Col>
                    +10
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>问问老师</Col>
                  <Col>
                    +5
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>分享1次</Col>
                  <Col>
                    +5
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>打卡7天</Col>
                  <Col>
                    +10
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>打卡14天</Col>
                  <Col>
                    +30
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>打卡30天</Col>
                  <Col>
                    +50
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>累计做题10小时</Col>
                  <Col>
                    +20
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
                <Row>
                  <Col>口语录音5个</Col>
                  <Col>
                    +10
                    <Image src={imgCredits} alt="credits" />
                  </Col>
                </Row>
              </AnswerTable>
            </Answer>
          </Rule>
          <Rule>
            <Question>
              <QuestionIcon>Q</QuestionIcon>
              <QuestionText>斩托福积分怎么使用？</QuestionText>
            </Question>
            <Answer>
              <AnswerIcon>A</AnswerIcon>
              <AnswerText>斩托福积分可以用来兑换奖品，购买课程及参加活动等。</AnswerText>
            </Answer>
          </Rule>
          <Rule>
            <Question>
              <QuestionIcon>Q</QuestionIcon>
              <QuestionText>斩托福积分的有效期是多长？</QuestionText>
            </Question>
            <Answer>
              <AnswerIcon>A</AnswerIcon>
              <AnswerText>积分有效期最长2年，积分累积规则以积分说明为准，智课教育保留调整积分相关规则的权利。</AnswerText>
            </Answer>
          </Rule>
        </RuleList>
      </div>
    );
  }
}
