import React from 'react';
import PropTypes from 'prop-types';

import { BasicOverflowContainer, DefaultContainer, AdBanner, Image } from 'ui';
import imgAdCustom from 'images/adCustom.jpg';
import { showPanel } from 'helpers/meiqia';

import StatsView from './stats';
import RecordsView from './records';
import Tabs from './tabs';

export default function StudyView({ type, date, study }) {
  return (
    <DefaultContainer>
      <Tabs type={type} />
      <BasicOverflowContainer>
        <AdBanner
          onClick={() => showPanel()}
        >
          <Image src={imgAdCustom} alt="ad" />
        </AdBanner>
        {
          type === 'stats' && <StatsView />
        }
        {
          type === 'records' && <RecordsView date={date} records={study.get('records')} />
        }
      </BasicOverflowContainer>
    </DefaultContainer>
  );
}

StudyView.propTypes = {
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  study: PropTypes.object.isRequired,
};
