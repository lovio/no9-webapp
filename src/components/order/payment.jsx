import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'ui/button';

const Container = styled.div`
  background-color: white;
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.2rem;
  margin-bottom: 0.1rem;
`;

class Payment extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    triggerWechatPay: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }
  render() {
    const { triggerWechatPay, product } = this.props;
    return (
      <Container>
        <Button onClick={() => triggerWechatPay(product)}>微信支付</Button>
      </Container>
    );
  }
}

export default Payment;
