import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Helmet from 'react-helmet';

import Empty from 'ui/empty';
import { BasicOverflowContainer, GreyContainer } from 'ui';

import Practice from './practice';
import Filter from '../common/filter';
import TagDesc from './tagDesc';

export default function TiTopicView(props) {
  const { topic, questionTypeId, authorizedRedirect } = props;
  const isLoading = topic.get('isLoading');
  const practiceList = (questionTypeId === '2' ? topic.getIn(['data', 'questionList', 'questions'])
    : topic.getIn(['data', 'practiceList', 'practice'])) || Immutable.List();
  return (
    <GreyContainer>
      <Helmet>
        <title>{topic.get('tagName')}</title>
      </Helmet>
      <TagDesc topic={topic} />
      <Filter type="题目" questionTypeId={questionTypeId} count={practiceList.size} {...props} isLoading={isLoading} />
      <BasicOverflowContainer>
        {
          isLoading && (
            <Empty type="isLoading" />
          )
        }
        {
          !isLoading && !!practiceList.size && (
            <div>
              {practiceList.map(practice => (
                <Practice
                  key={practice.get('id')}
                  practice={practice}
                  type={questionTypeId}
                  authorizedRedirect={authorizedRedirect}
                />))}
            </div>
          )
        }
        {
          !isLoading && !practiceList.size && (
            <Empty type="no-content" />
          )
        }
      </BasicOverflowContainer>
    </GreyContainer>
  );
}

TiTopicView.propTypes = {
  topic: PropTypes.object.isRequired,
  questionTypeId: PropTypes.string.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
