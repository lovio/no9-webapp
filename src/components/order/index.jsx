import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './userInfo';
import Intro from './intro';
import Payment from './payment';

class OrderView extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    triggerWechatPay: PropTypes.func.isRequired,
  };
  componentDidMount() {}

  render() {
    return (
      <div>
        <UserInfo user={this.props.user} />
        <Intro product={this.props.product} />
        <Payment product={this.props.product} triggerWechatPay={this.props.triggerWechatPay} />
      </div>
    );
  }
}

export default OrderView;
