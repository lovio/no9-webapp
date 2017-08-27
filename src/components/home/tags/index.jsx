import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { tagList } from 'constants/tags.json';

import map from 'lodash-es/map';
import filter from 'lodash-es/filter';

import {
  Container,
  TagList,
} from './components';

const TAGS = Immutable.fromJS(map(filter(tagList, 'showOnHome'), ({ subjectId, tags }) => ({
  subjectId,
  tags: filter(tags, 'showOnHome'),
})));

const nameMappings = {
  1: '阅读',
  2: '听力',
  3: '口语',
  4: '写作',
};

export default function TagListView({ authorizedRedirect }) {
  return (
    <Container>
      {
        TAGS.map(tags => (
          <TagList
            key={tags.get('subjectId')}
            name={nameMappings[tags.get('subjectId')]}
            tags={tags.get('tags')}
            authorizedRedirect={authorizedRedirect}
          />
        ))
      }

    </Container>
  );
}

TagListView.propTypes = {
  authorizedRedirect: PropTypes.func.isRequired,
};
