import React, { Component } from 'react';

import RuleView from '../components/rule';

export default class Rule extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <RuleView {...this.props} />;
  }
}
