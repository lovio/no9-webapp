import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import history from 'helpers/history';

import imgAdd from './add.png';

const Container = styled.div`padding: 0.2rem;`;

const AddCard = styled.div`
  text-align: center;
  height: 0.8rem;
  background-color: white;
  font-size: 0.14rem;
  line-height: 0.8rem;
  color: #4a4a4a;
  border-radius: 0.04rem;
  img {
    margin-top: 0.2rem;
    margin-right: 0.15rem;
    width: 0.38rem;
    height: 0.38rem;
  }
`;

class Cards extends Component {
  constructor(props) {
    super(props);
    this.props.loadCards();
  }
  render() {
    return (
      <Container>
        <Helmet>
          <title>提现账户</title>
        </Helmet>
        123
        <AddCard onClick={() => history.push('/mine/cards/new')}>
          <img src={imgAdd} alt="" />
          添加银行卡
        </AddCard>
      </Container>
    );
  }
}

Cards.propTypes = {
  loadCards: PropTypes.func.isRequired,
};

export default Cards;
