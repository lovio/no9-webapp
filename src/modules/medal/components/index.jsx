import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Loading from 'ui/loading';
import HeaderView from './header';
import ListView from './list';
import ModalView from './modal';

export default class Medal extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    medals: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      medal: undefined,
      showMedalType: undefined,
      isShowMedal: false,
    };
  }

  showMedal() {
    return (medal, showMedalType) => {
      this.setState({
        medal,
        showMedalType,
        isShowMedal: true,
      });
    };
  }

  hideMedal() {
    return () => {
      this.setState({
        isShowMedal: false,
      });
    };
  }

  render() {
    if (this.props.medals.status !== 'SUCCESS') {
      return <Loading />;
    }

    const medals = this.props.medals.data;
    const firstStyle = {
      marginTop: '-0.2rem',
      paddingBottom: '0.3rem',
    };
    const secondStyle = {
      paddingBottom: '0.3rem',
    };

    return (
      <div style={{ minHeight: '100%', backgroundColor: '#fff' }}>
        <Helmet>
          <title>我的成就</title>
        </Helmet>

        <HeaderView medals={this.props.medals} userInfo={this.props.userInfo} />

        {
          medals.get('finished').size > 0 ? (
            <div style={firstStyle}>
              <ListView
                type="achieved"
                medals={medals.get('finished')}
                showMedal={this.showMedal()}
              />
            </div>
          ) : ''
        }

        {
          medals.get('unfinished').size > 0 ? (
            <div style={medals.get('finished').size > 0 ? secondStyle : firstStyle}>
              <ListView
                type="unclaimed"
                medals={medals.get('unfinished')}
                showMedal={this.showMedal()}
              />
            </div>
          ) : ''
        }

        {
          this.state.isShowMedal ? (
            <ModalView
              userInfo={this.props.userInfo}
              medal={this.state.medal}
              type={this.state.showMedalType}
              hideMedal={this.hideMedal()}
            />
          ) : ''
        }
      </div>
    );
  }
}
