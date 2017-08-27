import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'ui';

import imgCredits from 'images/credits.png';
import imgMedalUnclaimed from 'images/medal-unclaimed.png';
import imgMedalAchieved from 'images/medal-achieved.png';

import MedalImageView from './medalImage';

export const ImgTitle = styled.div`
  img {
    height: 0.26rem;
  }
`;

export const List = styled.div`
  padding: 0 0.225rem 0 0.225rem;
  overflow: hidden;
`;

export const Medal = styled.div`
  float: left;
  width: 0.9rem;
  width: 33.33%;
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  margin-top: 0.2rem;
  text-align: center;
`;

export const Title = styled.div`
  margin-top: 0.05rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.12rem;
`;

export const Description = styled.div`
  margin-top: 0.05rem;
  color: #8F9DA5;
  font-size: 0.11rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Credit = styled.div`
  margin-top: 0.05rem;
  color: #8F9DA5;
  font-size: 0.11rem;

  img {
    width: 0.12rem;
    height: 0.12rem;
    vertical-align: -0.02rem;
    margin-right: 0.04rem;
  }
`;

export default class Container extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    medals: PropTypes.object.isRequired,
    showMedal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const type = this.props.type;
    const medals = this.props.medals;

    return (
      <div style={{ position: 'relative' }}>
        <ImgTitle>
          <Image
            src={type === 'achieved' ? imgMedalAchieved : imgMedalUnclaimed}
            alt="medal-achieved"
            style={{ display: 'block', margin: '0 auto' }}
          />
        </ImgTitle>

        <List>
          {medals.toJSON().map(medal => (
            <Medal
              key={medal.medal}
              onClick={() => this.props.showMedal(medal, type)}
            >
              <MedalImageView id={medal.medal} type={type} />
              <Title>{medal.medalName}</Title>
              <Description>【{medal.condition}】</Description>
              <Credit>
                <Image src={imgCredits} />
                积分+{medal.point}
              </Credit>
            </Medal>
          ))}
        </List>
      </div>
    );
  }
}
