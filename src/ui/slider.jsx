import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Slick from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: false,
  swipe: true,
};

export default class Slider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.instanceOf(List),
    ]).isRequired,
  }

  // react-slick有个bug,不能自动播放。。。貌似这个库目前也没有人维护
  // 担心
  componentDidMount() {
    this.timeoutId = setInterval(this.slider.innerSlider.play, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timeoutId);
  }

  render() {
    return (
      <Slick ref={(slider) => { this.slider = slider; }} {...settings}>
        {this.props.children}
      </Slick>
    );
  }
}
