import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Star from './stars';

const Title = styled.p`
  margin: 0.04rem 0 0.04rem 1rem;
  font-size: 0.14rem;
  color: #2E3236;
  line-height: 0.18rem;
`;

const Recommend = styled.p`
  margin: 0 0 0 1rem;
  font-size: 0.12rem;
  color: #2E3236;
  line-height: 0.22rem;
  span {
    margin: 0.05rem 0 0.05rem 0.1rem;
  }
`;

const BookDesc = styled.div`
  overflow: auto;
  img {
    margin-left: 0.02rem;
    float: left;
    width: 0.88rem;
    height: 0.5rem;
  }
`;

const BookIntro = styled.p`
  margin: 0.1rem 0 0.1rem;
  font-size: 0.12rem;
  color: #8F9DA5;
  line-height: 0.18rem;
`;

function BookView({ book }) {
  return (
    <div>
      <BookDesc>
        <img src={book.get('image')} alt="暂无图片" />
        <Title>{book.get('name')}</Title>
        {
          !!book.get('recommendNumber') && (
            <Recommend>推荐指数<Star count={book.get('recommendNumber')} /></Recommend>
          )
        }
      </BookDesc>
      <BookIntro>
        {book.get('introduction')}
      </BookIntro>
    </div>
  );
}

BookView.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookView;
