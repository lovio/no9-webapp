import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { getTypeNameBySubjectId } from 'helpers/fieldMappings';
import { BasicOverflowContainer, GreyContainer, Empty } from 'ui';
import Tabs from './tabs';
import Package from './package';
import Books from '../common/books';
import Filter from '../common/filter';

export default function TiExerciseView(props) {
  const { subjectId, textbookId, ti, packageId, choosePackage, authorizedRedirect } = props;
  const isLoading = ti.getIn(['questionPackages', 'isLoading']);
  const packages = ti.getIn(['questionPackages', 'data']);
  return (
    <GreyContainer>
      <Helmet>
        <title>{`${getTypeNameBySubjectId(subjectId)}真题`}</title>
      </Helmet>
      <Books books={ti.get('tabs')} />
      <Tabs tabs={ti.get('tabs')} subjectId={subjectId} textbookId={textbookId} />
      <Filter type="套题" count={packages.size} {...props} isLoading={isLoading} />
      <BasicOverflowContainer>
        {
          isLoading && (
            <Empty type="isLoading" />
          )
        }
        {
          !isLoading && !!packages.size && (
            <div>
              {
                packages.map(pkg => (
                  <Package
                    key={pkg.get('id')}
                    pkg={pkg}
                    choosePackage={choosePackage}
                    packageId={packageId}
                    subjectId={subjectId}
                    authorizedRedirect={authorizedRedirect}
                  />
                ))}
            </div>
          )
        }
        {
          !isLoading && !packages.size && (
            <Empty type="no-content" />
          )
        }
      </BasicOverflowContainer>
    </GreyContainer>
  );
}

TiExerciseView.propTypes = {
  choosePackage: PropTypes.func.isRequired,
  packageId: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  textbookId: PropTypes.string.isRequired,
  ti: PropTypes.object.isRequired,
  authorizedRedirect: PropTypes.func.isRequired,
};
