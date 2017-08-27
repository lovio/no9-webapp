import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconStar from 'images/star.svg';
import imgBgMedal from 'images/bg-medal.jpg';
import imgStalk from 'images/stalk.png';
import imgBadge from 'images/badge-share-medal.png';
import ShareArrowView from 'components/common/share_arrow';
import { Image } from 'ui';

import { site } from '../../../../config.json';

export const Container = styled.div`
  position: relative;
  height: 2.4rem;
  color: #fff;
  background-image: url('${imgBgMedal}');
  background-position: center;
  background-size: 3.75rem 2.4rem;
  background-repeat: no-repeat;
  text-align: center;

  & > img:first-of-type {
    width: 1rem;
  }

  & > img:nth-of-type(2) {
    width: 1.16rem;
  }
`;

export const Count = styled.div`
  padding-top: 0.08rem;
  font-size: 0.6rem;
  text-align: center;
  text-shadow: 0 0.01rem 0.1rem #DB4217;
`;

export const Info = styled.div`
  text-align: center;
  margin-top: -0.1rem;
  font-size: 0.12rem;

  svg {
    width: 0.12rem;
    height: 100%;
    vertical-align: -0.01rem;
    margin-right: 0.05rem;
  }

  span {
    margin: 0 0.04rem;
  }
`;

export const Text = styled.div`
  margin-top: 0.15rem;
  color: #FDBC97;
  font-size: 0.12rem;
`;

export default class Header extends Component {
  static propTypes = {
    medals: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  showModal() {
    return () => {
      this.setState({
        isShowModal: true,
      });
    };
  }

  hideModal() {
    return () => {
      this.setState({
        isShowModal: false,
      });
    };
  }

  render() {
    const medals = this.props.medals;

    const countText =
      medals.status === 'SUCCESS'
        ? medals.data.get('finished').size
        : '--';

    return (
      <Container>
        <Count>{countText}</Count>
        <Image src={imgStalk} alt="stalk" style={{ marginTop: '-0.4rem' }} />
        <Info>
          <IconStar />
          共获得勋章<span>{countText}</span>枚
        </Info>

        {
          parseInt(countText, 10) ? (
            <Image
              src={imgBadge}
              alt="badge"
              style={{ marginTop: '0.1rem' }}
              onClick={this.showModal()}
            />
          ) : (
            <Text>暂时没有成就，加油努力哦~</Text>
          )
        }

        {
          this.state.isShowModal ? (
            <ShareArrowView
              link={`${site.zhanToefl}/#/medal/share/${this.props.userInfo.get('userId')}`}
              title="目前只有5%的人全拿到了"
              desc="据说得到8个托福荣誉勋章，还有神秘礼品赠送～"
              hideModal={this.hideModal()}
            />
          ) : ''
        }
      </Container>
    );
  }
}
