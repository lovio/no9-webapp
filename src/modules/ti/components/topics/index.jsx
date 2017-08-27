import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { getTypeNameBySubjectId } from 'helpers/fieldMappings';
import Empty from 'ui/empty';
import { BasicOverflowContainer, DefaultContainer } from 'ui';

import Topic from './topic';

export default function TiTopicsView(props) {
  const isLoading = props.topics.get('isLoading');
  const topics = props.topics.get('data');
  return (
    <DefaultContainer>
      <Helmet>
        <title>{`${getTypeNameBySubjectId(props.subjectId)}${props.type === '1' ? '话题' : '题型'}`}</title>
      </Helmet>
      <BasicOverflowContainer>
        {
          isLoading && (
            <Empty type="isLoading" />
          )
        }
        {
          !isLoading && !!topics.size && (
            <div>
              {
                topics.map((topic, index) => <Topic key={topic.get('id') || index} topic={topic} type={props.type} />)
              }
            </div>
          )
        }
        {
          !isLoading && !topics.size && (
            <Empty type="no-content" />
          )
        }
      </BasicOverflowContainer>
    </DefaultContainer>
  );
}

TiTopicsView.propTypes = {
  topics: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
};
