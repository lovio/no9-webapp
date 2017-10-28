import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/auth';

import { loadOrders, loadMoreOrders, triggerWechatPay, cancel } from 'actions/order';

import OrdersView from 'components/mine/orders';

class Orders extends Component {
  static propTypes = {
    orders: PropTypes.object.isRequired,
    loadOrders: PropTypes.func.isRequired,
    loadMoreOrders: PropTypes.func.isRequired,
    pagination: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    triggerWechatPay: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    props.loadOrders();
    props.getUserInfo();
  }

  render() {
    const { orders, pagination, user } = this.props;
    return (
      <div>
        <Helmet>
          <title>订单记录</title>
        </Helmet>
        <OrdersView
          orders={orders}
          pagination={pagination}
          loadMoreOrders={this.props.loadMoreOrders}
          user={user}
          triggerWechatPay={this.props.triggerWechatPay}
          cancel={this.props.cancel}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    orders: state.getIn(['mine', 'orders']),
    pagination: state.getIn(['pagination', 'orders']),
    user: state.get('user'),
  };
}

export default connect(mapStateToProps, {
  loadOrders,
  loadMoreOrders,
  getUserInfo,
  triggerWechatPay,
  cancel,
})(Orders);
