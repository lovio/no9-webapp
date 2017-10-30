import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'ui/button';

import imgChecked from './checked.png';
import imgUnchecked from './unchecked.png';

const Container = styled.div`
  background-color: white;
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.2rem;
  padding: 0.15rem 0.25rem 0.25rem;
`;

const Agreement = styled.p`
  margin-bottom: 0.1rem;
  padding-left: 0.25rem;
  background-image: url(${props => (props.checked ? imgChecked : imgUnchecked)});
  background-repeat: no-repeat;
  background-size: 0.14rem 0.14rem;
  background-position: left;
  a {
    color: #0889ff;
  }
`;
class Payment extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    cityId: PropTypes.number.isRequired,
    createNewOrder: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  renderCities = () => {};

  render() {
    const { createNewOrder, product, cityId, amount } = this.props;
    return (
      <Container>
        <Agreement
          checked={this.state.checked}
          onClick={() =>
            this.setState(prevState => ({
              checked: !prevState.checked,
            }))}>
          我同意<Link to="/agreement2">《停车设施委托建设及委托管理协议》</Link>
        </Agreement>
        <Button
          disabled={!this.state.checked}
          onClick={() =>
            createNewOrder({
              product,
              cityId,
              amount,
            })}>
          微信支付
        </Button>
      </Container>
    );
  }
}

export default Payment;
