import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import includes from 'lodash-es/includes';
import { showPanel } from 'helpers/meiqia';

// import Empty from 'ui/empty';
import { getTypeNameBySubjectId } from 'helpers/fieldMappings';
import imgAdCustom from 'images/adCustom.jpg';
import { DefaultContainer, BasicOverflowContainer, AdBanner, Image } from 'ui';

import Articles from './_articles';
import Exercise from './_exercise';
import TagList from './_tags';

export default function TiView(props) {
  // if (!includes(['2', '3'], props.subjectId)) {
  //   return <Empty />;
  // }
  const { authorizedRedirect } = props;
  return (
    <DefaultContainer>
      <Helmet>
        <title>{`${getTypeNameBySubjectId(props.subjectId)}练习`}</title>
      </Helmet>
      <BasicOverflowContainer>
        <Articles />
        <AdBanner onClick={() => showPanel()}>
          <Image src={imgAdCustom} alt="ad" />
        </AdBanner>
        <Exercise {...props} />
        <TagList tags={props.tags} authorizedRedirect={authorizedRedirect} />
      </BasicOverflowContainer>
    </DefaultContainer>
  );
}

TiView.propTypes = {
  subjectId: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
