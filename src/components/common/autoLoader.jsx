import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Immutable from 'immutable';
import Loading from 'ui/loading';

import Waypoint from 'react-waypoint';

const LoadMore = styled.div`text-align: center;`;

const Empty = styled.p`
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.16rem;
  line-height: 0.4rem;
  color: #4a4a4a;
`;

// hasNoMoreComponent is optional
class AutoLoader extends Component {
  renderHasMore = () => {
    const { pagination } = this.props;
    const hasMore = pagination.get('hasMore');
    const isLoading = pagination.get('isLoading');
    if (!hasMore) {
      return <Empty>暂无任何交易记录</Empty>;
    }
    if (isLoading) {
      return <Loading />;
    }
    return <LoadMore onClick={() => this.props.loadMoreData()}>加载更多</LoadMore>;
  };

  renderWayPoint = () => {
    const { pagination } = this.props;
    if (!pagination.get('hasMore') || pagination.get('isLoading')) {
      return null;
    }
    return <Waypoint onEnter={this.props.loadMoreData} />;
  };
  render() {
    return (
      <div>
        {this.props.children}
        {this.renderWayPoint()}
        {this.renderHasMore()}
      </div>
    );
  }
}

AutoLoader.propTypes = {
  children: PropTypes.element.isRequired,
  pagination: PropTypes.instanceOf(Immutable.Map).isRequired,
  loadMoreData: PropTypes.func.isRequired,
};

export default AutoLoader;
