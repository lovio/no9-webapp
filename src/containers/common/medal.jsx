import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideMedal } from 'actions/common';
import Modal from 'modules/medal/components/modal';

class Medal extends Component {
  static propTypes = {
    medal: PropTypes.object.isRequired,
    hideMedal: PropTypes.func.isRequired,
  };

  hideMedal() {
    return () => {
      this.props.hideMedal();
    };
  }

  render() {
    const medalConfig = {
      0: '',
      1: '',
      2: '学霸检测仪',
      3: '报告老师',
      4: '我是学霸不服来战',
      5: '鸡血君',
      6: '不做题会死星人',
      7: '进击的学霸',
      8: '刷题酱',
      9: '小小播音员',
      10: '金耳朵',
      11: '',
      12: '',
    };
    const medal = this.props.medal.toJSON();

    return (
      <div>
        {!!this.props.medal.size && (
          <Modal
            type="get"
            hideMedal={this.hideMedal()}
            medal={{
              medal: medal.id,
              medalName: medalConfig[medal.id],
            }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    medal: state.getIn(['common', 'medal']),
  };
}

export default connect(mapStateToProps, {
  hideMedal,
})(Medal);
