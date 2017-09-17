import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import imgChecked from './checked.png';
import imgUnchecked from './unchecked.png';

const Container = styled.div`
  background-color: white;
  font-size: 0.14rem;
  color: #9b9b9b;
  line-height: 0.2rem;
  margin-bottom: 0.1rem;
`;

const Title = styled.p`
  padding: 0.1rem 0;
  text-align: center;
  color: #9b9b9b;
  border-bottom: 1px solid #dbdcdd;
`;

const Choice = styled.p`
  margin-left: 0.2rem;
  padding: 0.15rem 0 0.15rem 0.4rem;
  border-bottom: 1px solid #dbdcdd;
  color: #4a4a4a;

  background-image: url(${props => (props.checked ? imgChecked : imgUnchecked)});
  background-repeat: no-repeat;
  background-size: 0.2rem 0.2rem;
  background-position: left;

  &:last-of-type {
    border: none;
  }
`;

const CitySelector = ({ cities, cityId, chooseCity }) => (
  <Container>
    <Title>请选择省份</Title>
    {cities.map(city => (
      <Choice
        key={city.get('id')}
        checked={city.get('id') === cityId}
        onClick={() => chooseCity(city.get('id'))}
      >
        {city.get('name')}
      </Choice>
    ))}
  </Container>
);

CitySelector.propTypes = {
  cities: PropTypes.object.isRequired,
  cityId: PropTypes.number.isRequired,
  chooseCity: PropTypes.func.isRequired,
};

export default CitySelector;
