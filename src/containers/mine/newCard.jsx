import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { addNewCard } from 'actions/user';
import { getUserInfo } from 'actions/auth';
import AddNewCardView from 'components/mine/cards/new';

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    props.getUserInfo();
  }

  render() {
    return <AddNewCardView {...this.props} />;
  }
}

AddNewCard.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
};

const initialValuesSelector = createSelector(
  state => state.getIn(['user', 'name']),
  name => ({
    name,
  })
);

function mapStateToProps(state) {
  return {
    initialValues: initialValuesSelector(state),
  };
}

export default connect(mapStateToProps, { addNewCard, getUserInfo })(AddNewCard);
