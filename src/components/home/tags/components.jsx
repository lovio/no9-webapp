import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import styled from 'styled-components';
import history, { getTiUrl } from 'helpers/history';

export const Container = styled.div`
  background-color: #FFFFFF;
  padding: 0.1rem 0.15rem 0.2rem;
`;

export const TagTitle = styled.div`
  display: flex;
  height: 0.22rem;

  span {
    display: inline-block;
    width: 0.05rem;
    height: 0.14rem;
    background-color: #FE663B;
    margin: 0.04rem 0;
  }

  p {
    margin: 0;
    margin-left: 0.1rem;
    /* 听力: */
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #2E3236;
    letter-spacing: 0;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.07rem 0 0;
`;

const Tag = styled.div`
  background: #FFFFFF;
  border: 0.01rem solid #8F9DA5;
  margin-bottom: 0.11rem;
  border-radius: 0.02rem;
  /* 托福口语强化: */
  font-size: 0.12rem;
  line-height: 0.3rem;
  text-align: center;
  padding: 0 0.13rem 0 0.08rem;
  margin-right: 0.1rem;
  color: #2E3236;
  letter-spacing: 0;
`;

export function TagList({ name, tags, authorizedRedirect }) {
  return (
    <div>
      <TagTitle>
        <span />
        <p>
          {name}
        </p>
      </TagTitle>
      <Tags>
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
      </Tags>
    </div>
  );
}

TagList.propTypes = {
  name: PropTypes.string.isRequired,
  tags: PropTypes.object,
  authorizedRedirect: PropTypes.func.isRequired,
};

TagList.defaultProps = {
  tags: Immutable.List(),
};
