// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSearch } from 'helpers/history';
import includes from 'lodash/includes';
import Immutable from 'immutable';
// import { loadUserData, loadCapabilityTest, loadUserInfo } from 'actions/user';
// import { authorizedRedirect } from 'actions/common';
import { triggerWechatPay } from 'actions/order';
import find from 'lodash/find';
import products from 'constants/products.json';
import { DEFAULT_PRODUCT_ID } from 'constants/constants.json';

import OrderView from '../../components/order';

// class Product extends Component {
//   static propTypes = {
//   };

//   componentDidMount() {

//   }

//   render() {
//     return <ProductView />;
//   }
// }

const productSelector = createSelector(
  (state, props) => {
    const search = getSearch(props.location.search);
    const id = +search.paymentId;
    return includes([1, 2, 3, 4], id) ? id : DEFAULT_PRODUCT_ID;
  },
  id => Immutable.fromJS(find(products, { id })),
);

function mapStateToProps(state, props) {
  return {
    product: productSelector(state, props),
    user: state.getIn(['user']),
  };
}

export default connect(mapStateToProps, {
  triggerWechatPay,
})(OrderView);
