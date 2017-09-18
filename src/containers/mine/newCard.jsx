import { connect } from 'react-redux';
import { addNewCard } from 'actions/user';
import AddNewCardView from 'components/mine/cards/new';

export default connect(null, { addNewCard })(AddNewCardView);
