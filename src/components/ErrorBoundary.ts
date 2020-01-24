import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong: {error}</h1>;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
