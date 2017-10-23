import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'helpers/history';
import Loading from 'ui/loading';
import { Wrapper } from 'components/common/wrapper';

import imgRedCar from './redCar.png';
import imgBlueCar from './blueCar.png';
import imgMore from './more.png';

const Container = styled.div`
  background-color: white;
  line-height: 0.2rem;
  font-size: 0.14rem;
  margin-bottom: 0.1rem;
`;

const Title = styled.div`
  padding: 0.1rem 0;
  color: ${props => (props.red ? '#E01053' : '#57D3F2')};
  border-bottom: 1px solid #dbdcdd;

  img {
    display: inline-block;
    margin: 0.03rem 0.1rem 0.03rem 0.2rem;
    width: 0.2rem;
    height: 0.14rem;
  }
`;

const BuyMore = styled.p`
  text-align: center;
  color: #57d3f2;
  padding: 0.15rem;
  text-decoration: underline;
`;

const Item = styled.div`
  border-bottom: 1px solid #dbdcdd;
  margin-left: 0.2rem;
  line-height: 0.5rem;
  color: #4a4a4a;

  &:last-of-type {
    border: none;
  }
`;

const SoldOut = styled.span`
  margin-left: 0.2rem;
  font-size: 0.12rem;
  color: #818b96;
`;

const More = styled.span`
  float: right;
  line-height: 0.2rem;
  padding: 0.15rem 0.2rem;
  img {
    width: 0.12rem;
    height: 0.2rem;
  }
`;

class ZoneView extends Component {
  static propTypes = {
    loadCities: PropTypes.func.isRequired,
    loadZones: PropTypes.func.isRequired,
    loadCarports: PropTypes.func.isRequired,
    cities: PropTypes.object.isRequired,
    zones: PropTypes.object.isRequired,
    carports: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    props.loadCities();
    props.loadZones();
    props.loadCarports();
  }

  renderMyCarports = () => {
    const { isLoggedIn, carports, isLoading } = this.props;
    if (!isLoggedIn) {
      return null;
    }
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Container>
        <Title red>
          <img src={imgRedCar} alt="" />
          我的车位
        </Title>
        {carports.size ? (
          carports.map(carport => (
            <Item
              key={carport.get('id')}
              onClick={() =>
                history.push(carport.get('status') === 'unpaid' ? '/mine/orders' : '/mine/certs')}
            >
              {carport.get('status') === 'unpaid' && '您还有车位尚未完成支付，请点击查看详情'}
              {carport.get('status') === 'virtual' &&
                `您已购买${carport.getIn(['city', 'name'])}车位，建设中`}
              {carport.get('status') === 'real' && '小区车位已建成，点击查看车位详情'}
              <More>
                <img src={imgMore} alt="" />
              </More>
            </Item>
          ))
        ) : (
          <BuyMore onClick={() => history.push('/products')}>您暂无车位，请点击购买</BuyMore>
        )}
      </Container>
    );
  };

  render() {
    const { zones, cities } = this.props;
    return (
      <Wrapper>
        {this.renderMyCarports()}
        <Container>
          <Title>
            <img src={imgBlueCar} alt="" />
            建设中车位
          </Title>
          {cities.map(city => <Item key={city.get('id')}>{city.get('name')}</Item>)}
        </Container>
        <Container>
          <Title>
            <img src={imgBlueCar} alt="" />
            已建成车位
          </Title>
          {zones.map(zone => (
            <Item key={zone.get('id')}>
              {zone.get('name')}
              {zone.get('remain') === 0 && <SoldOut>车位已售罄</SoldOut>}
              {/* <More>
                <img src={imgMore} alt="" />
              </More> */}
            </Item>
          ))}
        </Container>
      </Wrapper>
    );
  }
}

export default ZoneView;
