import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getSearch } from 'helpers/history';
import includes from 'lodash/includes';
import Immutable from 'immutable';
// import { loadUserData, loadCapabilityTest, loadUserInfo } from 'actions/user';
// import { authorizedRedirect } from 'actions/common';
import { loadOrder } from 'actions/order';
import find from 'lodash/find';
import products from 'constants/products.json';
import { DEFAULT_PRODUCT_ID } from 'constants/constants.json';

import OrderView from '../../components/order/success';

const orderSelector = state => state.getIn(['order', 'data']);
const isLoadingSelector = state => state.getIn(['order', 'isLoading']);
const orderIdSelector = (state, props) => getSearch(props.location.search).orderId;

const productSelector = createSelector(orderSelector, (order) => {
  const productId = order.get('productId');
  const id = includes([1, 2, 3], productId) ? productId : DEFAULT_PRODUCT_ID;
  return Immutable.fromJS(find(products, { id }));
});

function mapStateToProps(state, props) {
  return {
    orderId: orderIdSelector(state, props),
    order: orderSelector(state),
    isLoading: isLoadingSelector(state),
    user: state.get('user'),
    product: productSelector(state, props),
  };
}

export default connect(mapStateToProps, {
  loadOrder,
})(OrderView);
