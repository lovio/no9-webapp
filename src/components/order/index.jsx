import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './userInfo';
import Intro from './intro';

class OrderView extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };
  componentDidMount() {}

  render() {
    return (
      <div>
        <UserInfo user={this.props.user} />
        <Intro product={this.props.product} />
      </div>
    );
  }
}

export default OrderView;
