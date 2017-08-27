import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history, { getTiUrl } from 'helpers/history';

const Container = styled.div`
  background-color: white;
  padding: 0.15rem 0.15rem 0.5rem 0.15rem;;
`;

const Title = styled.p`
  text-align: center;
  font-size: 0.12rem;
  color: #8F9DA5;
  letter-spacing: 0;
  line-height: 0.18rem;
  margin: 0 0 0.15rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  padding: 0 0.1rem;
  border: 0.01rem solid #8F9DA5;
  border-radius: 0.02rem;
  font-size: 0.12rem;
  color: #2E3236;
  letter-spacing: 0;
  line-height: 0.3rem;
  height: 0.3rem;
`;

export default function TagList({ tags, authorizedRedirect }) {
  return (
    <Container>
      <Title>小伙伴们都在做</Title>
      <TagContainer>
        {
          tags.map(tag => (
            <Tag
              key={tag.get('value')}
              onClick={() => {
                const innerLink = tag.get('innerLink');
                if (innerLink) {
                  history.push(innerLink);
                } else {
                  const url = getTiUrl({
                    subjectId: tag.getIn(['ti', 'subjectId']),
                    practiceId: tag.getIn(['ti', 'practiceId']),
                    questionId: tag.getIn(['ti', 'questionId']),
                  });
                  authorizedRedirect(url);
                }
              }}
            >{tag.get('value')}</Tag>
          ))
        }
      </TagContainer>
    </Container>
  );
}

TagList.propTypes = {
  tags: PropTypes.object.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
