import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSearch } from 'helpers/history';
import { loadShareInfo } from 'actions/user';
import { initWechat } from 'actions/wx';
import qs from 'qs';

import ShareView from 'components/share';

class Share extends Component {
  static defaultProps = {
    userId: '',
  }
  static propTypes = {
    initWechat: PropTypes.func.isRequired,
    loadShareInfo: PropTypes.func.isRequired,
    userId: PropTypes.string,
    share: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      this.props.loadShareInfo({ userId });
      this.props.initWechat({
        type: 'share',
        data: {
          link: `${location.href.split('?')[0]}?${qs.stringify({ userId })}`,
        },
      });
    }
  }

  render() {
    return <ShareView share={this.props.share} />;
  }
}

function mapStateToProps(state, props) {
  return {
    userId: getSearch(props.location.search).userId,
    share: state.get('share'),
  };
}

export default connect(mapStateToProps, {
  loadShareInfo,
  initWechat,
})(Share);
