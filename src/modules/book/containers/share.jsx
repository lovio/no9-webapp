import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearch } from 'helpers/history';
import { getBook } from '../actions';

import ShareView from '../components/share';

class Share extends Component {
  static propTypes = {
    getBook: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    isApp: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getBook({
      id: this.props.bookId,
      userId: this.props.userId,
      isApp: this.props.isApp,
    });
  }

  render() {
    return <ShareView {...this.props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    book: state.getIn(['book', 'book']),
    bookId: props.match.params.bookId,
    userId: props.match.params.userId,
    isApp: getSearch(props.location.search).isApp,
  };
}

export default connect(mapStateToProps, {
  getBook,
})(Share);
