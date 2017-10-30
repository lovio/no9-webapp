import { connect } from 'react-redux';
import { withdraw } from 'actions/user';
import { getUserInfo } from 'actions/auth';
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { Map } from 'immutable';
import isNaN from 'lodash-es/isNaN';
import WithdrawView from 'components/mine/withdraw';
import { dealNumber } from 'helpers/string';

const cardSelector = createSelector(
  state => state.getIn(['mine', 'cards']),
  state => state.getIn(['mine', 'card']),
  (cards, cardId) => {
    if (!cards.size) {
      return Map();
    }
    const c = cards.find(card => card.get('id') === cardId);
    if (c) {
      return c;
    }
    return Map();
  }
);

const selector = formValueSelector('withdraw');

const resetCashSelector = createSelector(
  state => +selector(state, 'amount'),
  amount => {
    const all = isNaN(amount) ? 0 : amount;
    return dealNumber(all / (1 + 0.06) * 100);
  }
);

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    card: cardSelector(state),
    restCash: resetCashSelector(state),
  };
}

export default connect(mapStateToProps, { withdraw, getUserInfo })(WithdrawView);
