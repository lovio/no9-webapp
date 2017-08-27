import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearch } from 'helpers/history';
import { getShareImage } from '../actions';

import ShareImageView from '../components/share_image';

class Share extends Component {
  static propTypes = {
    getShareImage: PropTypes.func.isRequired,
    bookId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    isApp: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.getShareImage({
      userId: this.props.userId,
      bookId: this.props.bookId,
      isApp: this.props.isApp,
    });
  }

  render() {
    return <ShareImageView {...this.props} />;
  }
}

function mapStateToProps(state, props) {
  return {
    shareImage: state.getIn(['book', 'shareImage']),
    bookId: props.match.params.bookId,
    userId: props.match.params.userId,
    isApp: getSearch(props.location.search).isApp,
  };
}

export default connect(mapStateToProps, {
  getShareImage,
})(Share);
