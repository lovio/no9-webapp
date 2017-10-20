import { connect } from 'react-redux';
import { withdraw } from 'actions/user';
import { createSelector } from 'reselect';
import { Map } from 'immutable';
import WithdrawView from 'components/mine/withdraw';

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
  },
);

function mapStateToProps(state) {
  return {
    user: state.get('user'),
    card: cardSelector(state),
  };
}

export default connect(mapStateToProps, { withdraw })(WithdrawView);
