// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCards, removeCard } from 'actions/user';

import CardsView from 'components/mine/cards';

function mapStateToProps(state) {
  return {
    cards: state.getIn(['mine', 'cards']),
  };
}

export default connect(mapStateToProps, {
  loadCards,
  removeCard,
})(CardsView);
