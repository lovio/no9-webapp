import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAuth } from 'actions/auth';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static defaultProps = {
      token: '',
    };

    static propTypes = {
      token: PropTypes.string,
      checkAuth: PropTypes.func.isRequired,
    };
    constructor(props) {
      super(props);
      this.props.checkAuth();
    }

    componentWillReceiveProps() {
      this.props.checkAuth();
    }

    render() {
      const { token, ...rest } = this.props;
      if (!token) {
        return null;
      }
      return <Component {...rest} />;
    }
  }

  function mapStateToProps(state) {
    return {
      token: state.getIn(['user', 'token']),
    };
  }
  return connect(mapStateToProps, { checkAuth })(AuthenticatedComponent);
}
