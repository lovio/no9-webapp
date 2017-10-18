import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import history from 'helpers/history';
import Button from 'ui/button';

import imgAdd from './add.png';
import imgDel from './del.png';

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

  p {
    font-size: 0.15rem;
    line-height: 0.8rem;
    color: #4a4a4a;
  }
`;

const BankIcon = styled.img`
  float: left;
  margin-top: 0.15rem;
  margin-left: 0.1rem;
  width: 1.75rem;
  height: 0.5rem;
`;

const Toggle = styled.div`margin-top: 0.2rem;`;

const Manage = styled.p`
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.18rem;
  color: #57d3f2;
`;

const DelButton = styled.img`
  padding: 0.3rem 0.05rem;
  float: right;
  width: 0.3rem;
`;

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inManagement: false,
    };
    this.props.loadCards();
  }

  toggleManagement = () =>
    this.setState(prevState => ({
      inManagement: !prevState.inManagement,
    }));

  render() {
    const { cards, removeCard, action, chooseCard } = this.props;
    return (
      <Container>
        <Helmet>
          <title>{action === 'withdraw' ? '选择银行卡' : '提现账户'}</title>
        </Helmet>
        {cards.map((card) => {
          const cardNo = card.get('cardNo');
          return (
            <Card
              key={card.get('id')}
              onClick={() => {
                if (action === 'withdraw' && !this.state.inManagement) {
                  chooseCard(card.get('id'));
                  history.push('/mine/withdraw');
                }
              }}
            >
              <BankIcon src={`${BANK_IMG_PREFIX}${card.get('bank')}`} alt="" />
              <p>
                {card.get('name')} | 尾号{cardNo.substr(cardNo.length - 4)}
                {this.state.inManagement && (
                  <DelButton src={imgDel} alt="" onClick={() => removeCard(card.get('id'))} />
                )}
              </p>
            </Card>
          );
        })}
        <AddCard
          onClick={() =>
            history.push({
              pathname: '/mine/cards/new',
              search: history.location.search,
            })}
        >
          <img src={imgAdd} alt="" />
          添加银行卡
        </AddCard>
        {!!cards.size && (
          <Toggle onClick={() => this.toggleManagement()}>
            {this.state.inManagement ? <Button>确定</Button> : <Manage>管理取现账户</Manage>}
          </Toggle>
        )}
      </Container>
    );
  }
}

Cards.propTypes = {
  loadCards: PropTypes.func.isRequired,
  cards: PropTypes.object.isRequired,
  removeCard: PropTypes.func.isRequired,
  chooseCard: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default Cards;
