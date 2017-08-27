import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Empty, Slider } from 'ui';
import ImgClose from 'images/close.svg';
import Book from './book';

const Container = styled.div`
  position: relative;
  height: 1.9rem;
  margin-bottom: 0.1rem;
  padding: 0.15rem;
  background-color: white;
  overflow: hidden;
  border-bottom: 0.01rem solid #EAEFF2;
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


export default class BooksView extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  render() {
    const { books } = this.props;
    if (!books.size) {
      return (
        <Container>
          <Empty type="isLoading" />;
        </Container>
      );
    }
    return (
      <Container isVisible={this.state.isVisible}>
        <Close onClick={() => this.setState({ isVisible: false })} />
        <Slider>
          {
            books.map(book => (
              <div key={book.get('id')}>
                {/* wired */}
                <Book book={book} />
              </div>
              ),
            )
          }
        </Slider>
      </Container>
    );
  }
}
