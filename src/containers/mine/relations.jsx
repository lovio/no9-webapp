import { connect } from 'react-redux';
import { loadRelations } from 'actions/user';
import { getSearch } from 'helpers/history';

import RelationView from 'components/mine/relations';

function mapStateToProps(state, props) {
  return {
    userId: getSearch(props.location.search).userId,
    relations: state.getIn(['mine', 'relations']),
    me: state.get('user'),
  };
}

export default connect(mapStateToProps, {
  loadRelations,
})(RelationView);
