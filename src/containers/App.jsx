/* eslint-disable import/default */
import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'helpers/history';
import Routes from './Routes';
import ErrorBoundary from '../components/common/errorBoundary';

export default function App({ store }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
