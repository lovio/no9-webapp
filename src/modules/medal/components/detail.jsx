import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';

import imgCredits from 'images/credits.png';

import MedalImageView from './medalImage';

export const Detail = styled.div`
  text-align: center;

  img {
    width: 1.87rem;
    height: 1.87rem;
  }
`;

export const Title = styled.div`
  margin-top: 0.18rem;
  font-size: 0.17rem;
`;

export const Description = styled.div`
  margin-top: 0.05rem;
  color: #8F9DA5;
  font-size: 0.14rem;
`;

export const Credit = styled.div`
  margin-top: 0.05rem;
  color: #8F9DA5;
  font-size: 0.14rem;

  img {
    width: 0.12rem;
    height: 0.12rem;
    vertical-align: -0.01rem;
    margin-right: 0.04rem;
  }
`;

export default class Modal extends Component {
  static propTypes = {
    medal: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const medal = this.props.medal;

    return (
      <Detail>
        <MedalImageView id={medal.medal} type="achieved" />
        <Title>{medal.medalName}</Title>
        <Description>【{medal.condition}】</Description>
        <Credit>
          <Image src={imgCredits} alt="medal-credits" />
          积分+{medal.point}
        </Credit>
      </Detail>
    );
  }
}
