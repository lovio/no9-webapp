import React from 'react';
import styled from 'styled-components';
import Avatar from 'ui/avatar';
import history from 'helpers/history';
import Slider from 'ui/slider';

import { articles } from './slides.json';

const Container = styled.div`
  background-color: white;
  padding: 0.15rem;
  overflow: hidden;
`;

const Title = styled.div`
  overflow: auto;
  margin-bottom: 0.12rem;
  p {
    margin: 0;
    padding-left: 0.42rem;
    font-size: 0.12rem;
    color: #2E3236;
    line-height: 0.32rem;
  }
`;

const SliderContainer = styled.div`
  margin-top: 0.13rem;
  padding: 0 0.05rem;
`;

const Article = styled.div`
  padding-bottom: 0.1rem;
  p {
    margin: 0;
  }
  p:nth-of-type(1) {
    font-size: 0.14rem;
    color: #2E3236
    line-height: 0.2rem;
  }

  p:nth-of-type(2) {
    margin-top: 0.06rem;
    line-height: 0.18rem;
    font-size: 0.12rem;
    color: #8F9DA5;
  }
`;

/* eslint-disable max-len */
export default function Articles() {
  return (
    <Container>
      <Title>
        <Avatar left width="0.32rem" height="0.32rem" />
        <p>小福消息</p>
      </Title>
      <SliderContainer>
        <Slider>
          {
            articles.map(({ id, link, title, desc }) => (
              <Article
                key={id}
                onClick={() => {
                  if (link) {
                    location.assign(link);
                  } else {
                    history.push(`/articles/${id}`);
                  }
                }}
              >
                <p>{title}</p>
                <p>{desc}</p>
              </Article>
            ))
          }
        </Slider>
      </SliderContainer>
    </Container>
  );
}
