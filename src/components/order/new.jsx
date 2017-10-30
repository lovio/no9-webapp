import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MINIMAL_PAY } from 'constants/constants.json';
import UserInfo from './userInfo';
import Intro from './intro';
import Payment from './payment';
import Cities from './cities';
import Amount from './amount';

class OrderView extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    createNewOrder: PropTypes.func.isRequired,
    loadCities: PropTypes.func.isRequired,
    cities: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cityId: 1,
      amount: MINIMAL_PAY,
    };
    this.props.loadCities();
  }

  setAmount = amount => this.setState({ amount });
  chooseCity = cityId => this.setState({ cityId });

  render() {
    const { user, product, cities, createNewOrder } = this.props;
    return (
      <div>
        <UserInfo user={user} />
        {!!cities.size && <Cities cities={cities} cityId={this.state.cityId} chooseCity={this.chooseCity} />}
        {product.get('id') !== 1 && <Amount product={product} setAmount={this.setAmount} amount={this.state.amount} />}
        <Intro product={product} amount={this.state.amount} />
        <Payment
          product={product}
          cityId={this.state.cityId}
          createNewOrder={createNewOrder}
          amount={this.state.amount}
        />
      </div>
    );
  }
}

export default OrderView;
