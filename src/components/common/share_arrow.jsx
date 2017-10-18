import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Image } from 'ui';
import { initWechat } from 'actions/wx';

import imgShareArrow from './share-arrow.png';

export const Container = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  img {
    position: fixed;
    top: 0.1rem;
    right: 0.26rem;
    width: 0.6rem;
  }
`;

export const Text = styled.div`
  position: fixed;
  font-size: 0.18rem;
  right: 0.15rem;
  top: 0.9rem;
  color: #fff;
`;

export const Button = styled.div`
  position: fixed;
  top: 1.25rem;
  right: 0.15rem;
  padding: 0.08rem 0.18rem;
  font-size: 0.14rem;
  background: #fff;
  border-radius: 1rem;
  color: #333;
`;

class ShareArrow extends Component {
  static defaultProps = {
    link: '',
    title: '',
    imgUrl: '',
    desc: '',
  };

  static propTypes = {
    initWechat: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    link: PropTypes.string,
    title: PropTypes.string,
    imgUrl: PropTypes.string,
    desc: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { link, title, imgUrl, desc } = this.props;
    if (link || title || imgUrl || desc) {
      this.props.initWechat({
        type: 'share',
        data: {
          link,
          title,
          imgUrl,
          desc,
        },
      });
    } else {
      this.props.initWechat({
        type: 'share',
      });
    }
  }

  componentWillUnmount() {
    this.props.initWechat({
      type: 'share',
    });
  }

  render() {
    return (
      <Container onClick={this.props.hideModal}>
        <Image src={imgShareArrow} />
        <Text>亲，请点击右上角分享</Text>
        <Button>我知道了</Button>
      </Container>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, {
  initWechat,
})(ShareArrow);
