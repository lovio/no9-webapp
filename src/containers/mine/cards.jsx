import { connect } from 'react-redux';
import { loadCards, removeCard, chooseCard } from 'actions/user';
import { getSearch } from 'helpers/history';

import CardsView from 'components/mine/cards';

function mapStateToProps(state, props) {
  return {
    action: getSearch(props.location.search).action,
    cards: state.getIn(['mine', 'cards']),
  };
}

export default connect(mapStateToProps, {
  loadCards,
  removeCard,
  chooseCard,
})(CardsView);
