import React from 'react';
import styled from 'styled-components';
import { AdBanner } from 'ui';
import history from 'helpers/history';
import imgBookActivity from 'images/book-activity.png';

const Banner = styled(AdBanner)`
  margin-bottom: 0.1rem;
`;

const BookActivity = () => (
  <Banner
    onClick={
      () => history.push('/book')
    }
  >
    <img src={imgBookActivity} alt="ad" />
  </Banner>
);

export default BookActivity;
