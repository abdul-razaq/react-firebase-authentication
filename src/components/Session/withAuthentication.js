import React, { Component } from 'react';

const withAuthentication = Component => {
  class withAuthentication extends Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return withAuthentication;
};

export default withAuthentication;
