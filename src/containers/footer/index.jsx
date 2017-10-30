import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash-es/includes';
import get from 'lodash-es/get';
import FooterView from 'components/footer';

const footerPathList = ['/', '/products', '/zones', '/mine'];

const componentName = props => {
  if (!includes(footerPathList, get(props, 'location.pathname'))) {
    return null;
  }
  return <FooterView {...props} />;
};

componentName.propTypes = {
  location: PropTypes.object.isRequired,
};

export default componentName;
