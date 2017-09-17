import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserInfo from './userInfo';
import Intro from './intro';
import Payment from './payment';
import Cities from './cities';

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
    };
    this.props.loadCities();
  }

  chooseCity = cityId => this.setState({ cityId });

  render() {
    const { user, product, cities, createNewOrder } = this.props;
    return (
      <div>
        <UserInfo user={user} />
        {!!cities.size && (
          <Cities cities={cities} cityId={this.state.cityId} chooseCity={this.chooseCity} />
        )}
        <Intro product={product} />
        <Payment product={product} cityId={this.state.cityId} createNewOrder={createNewOrder} />
      </div>
    );
  }
}

export default OrderView;
