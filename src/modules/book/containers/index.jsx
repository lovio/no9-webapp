import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearch } from 'helpers/history';
import { getBooks, postExchange, postInvitation } from '../actions';

import BookView from '../components';

class Book extends Component {
  static propTypes = {
    getBooks: PropTypes.func.isRequired,
    postInvitation: PropTypes.func.isRequired,
    invitationBookId: PropTypes.string.isRequired,
    invitationInviterId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getBooks();

    if (this.props.invitationBookId && this.props.invitationInviterId) {
      this.props.postInvitation({
        bookId: this.props.invitationBookId,
        inviterId: this.props.invitationInviterId,
      });
    }
  }

  render() {
    return <BookView {...this.props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    books: state.getIn(['book', 'books']),
    isApp: getSearch(props.location.search).isApp,
    invitationBookId: getSearch(props.location.search).bookId,
    invitationInviterId: getSearch(props.location.search).inviterId,
  };
}

export default connect(mapStateToProps, {
  getBooks,
  postExchange,
  postInvitation,
})(Book);
