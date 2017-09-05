import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OrderView extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  };
  componentDidMount() {}

  render() {
    console.log(this.props.product);
    return <div />;
  }
}

export default OrderView;
