import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import styled from 'styled-components';
import Loading from 'ui/loading';
import ImgClose from 'images/close.svg';
import Book from '../common/books/book';

const Containter = styled.div`
  position: relative;
  margin-bottom: 0.1rem;
  padding: 0.15rem;
  background-color: white;
  border-bottom: 0.01rem solid #EAEFF2;
  min-height: 1.2rem;
  ${(props) => {
    if (!props.isVisible) {
      return 'display: none;';
    }
    return '';
  }}
`;

const Close = styled(ImgClose) `
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  width: 0.12rem;
  height: 0.12rem;
  z-index: 100;
`;

export default class TagDesc extends Component {
  static propTypes = {
    topic: PropTypes.instanceOf(Map).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    const { topic } = this.props;
    return (
      <Containter isVisible={this.state.isVisible}>
        {
          topic.get('isLoading') && <Loading />
        }
        {
          !topic.get('isLoading') && (
            <div>
              <Close onClick={() => this.setState({ isVisible: false })} />
              <Book
                book={Map({
                  image: topic.getIn(['data', 'extraInfo', 'pic_url']),
                  name: topic.getIn(['data', 'tagName']),
                  recommendNumber: topic.getIn(['data', 'recommendNumber']),
                  introduction: topic.getIn(['data', 'extraInfo', 'description']) || '暂无描述',
                })}
              />
            </div>
          )
        }
      </Containter>
    );
  }
}
