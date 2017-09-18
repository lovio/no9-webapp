import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import history from 'helpers/history';

import imgAdd from './add.png';

const BANK_IMG_PREFIX = 'https://apimg.alipay.com/combo.png?d=cashier&t=';
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

const Card = styled.div`
  margin-bottom: 0.12rem;
  border-radius: 0.04rem;
  border: 1px solid #4a4a4a;
  background: #ffffff;
  height: 0.8rem;

  img {
    float: left;
    margin-top: 0.15rem;
    margin-left: 0.1rem;
    width: 1.75rem;
    height: 0.5rem;
  }

  p {
    margin-top: 0.25rem;
    font-size: 0.15rem;
    line-height: 0.3rem;
    color: #4a4a4a;
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
        {this.props.cards.map((card) => {
          const cardNo = card.get('cardNo');
          return (
            <Card>
              <img src={`${BANK_IMG_PREFIX}${card.get('bank')}`} alt="" />
              <p>
                {card.get('name')} | 尾号{cardNo.substr(cardNo.length - 4)}
              </p>
            </Card>
          );
        })}
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
  cards: PropTypes.object.isRequired,
};

export default Cards;
