import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Image } from 'ui';
import imgMedalAchieved from 'images/medal-achieved-white.png';
import imgMedalUnclaimed from 'images/medal-unclaimed-white.png';
import imgCredits from 'images/credits.png';
import imgCancel from 'images/cancel.png';

import ShareArrowView from 'components/common/share_arrow';
import MedalImageView from './medalImage';
import { site } from '../../../../config.json';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  padding-top: 1.07rem;
  background: rgba(0,0,0,0.85);
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 0.24rem;
  text-align: center;

  img {
    height: 0.26rem;
  }
`;

const ImgCancel = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0.2rem;
  text-align: center;

  img {
    width: 0.3rem;
    height: 0.3rem;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 0.16rem;
  text-align: center;

  &:nth-of-type(1) {
    margin-top: 0.18rem;
  }

  span {
    font-weight: bold;
    margin-right: 0.05rem;
  }
`;

const Subtitle = styled.div`
  color: #fff;
  font-size: 0.14rem;
  margin-top: 0.05rem;
  text-align: center;

  &:nth-of-type(1) {
    margin-top: 0.18rem;
  }

  img {
    width: 0.12rem;
    height: 0.12rem;
    vertical-align: -0.01rem;
    margin-right: 0.04rem;
  }
`;

const Btn = styled.div`
  background: #FE663B;
  color: #fff;
  margin-top: 0.3rem;
  width: 1.8rem;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  border-radius: 0.03rem;
  font-size: 0.14rem;
`;

export default class Modal extends Component {
  static propTypes = {
    medal: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    hideMedal: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  showModal() {
    return (event) => {
      event.stopPropagation();

      this.setState({
        isShowModal: true,
      });
    };
  }

  hideModal() {
    return (event) => {
      event.stopPropagation();

      this.setState({
        isShowModal: false,
      });
    };
  }

  render() {
    const medal = this.props.medal;
    const type = this.props.type;

    return (
      <Container onClick={() => this.props.hideMedal()}>
        <ModalBox>
          <ImgTitle>
            <Image src={this.props.type === 'unclaimed' ? imgMedalUnclaimed : imgMedalAchieved} />
          </ImgTitle>

          <MedalImageView id={medal.medal} type={this.props.type} />

          {
            type === 'get' ? (
              <div>
                <Title>亲，恭喜你获得</Title>
                <Title><span>{medal.medalName}</span>勋章</Title>
                <Link to="/medal">
                  <Btn>看看我的成就</Btn>
                </Link>
              </div>
            ) : (
              <div>
                <Title><span>{medal.medalName}</span></Title>
                <Subtitle>【{medal.condition}】</Subtitle>
                <Subtitle>
                  <Image src={imgCredits} />
                  积分+{medal.point}
                </Subtitle>
                {
                  this.props.type === 'achieved' && (
                    <Btn onClick={this.showModal()}>分享成就</Btn>
                  )
                }
              </div>
            )
          }
          <ImgCancel>
            <Image src={imgCancel} />
          </ImgCancel>
        </ModalBox>

        {
          this.state.isShowModal ? (
            <ShareArrowView
              link={`${site.zhanToefl}/#/medal/share/${this.props.userInfo.get('userId')}/${medal.medal}`}
              title="23333又一枚勋章～"
              desc="据说这里涵盖了90%的托福高分答题思路，跟我一起来刷分！"
              hideModal={this.hideModal()}
            />
          ) : ''
        }
      </Container>
    );
  }
}
