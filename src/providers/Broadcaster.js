import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FirestoreDocument } from 'react-firestore';

const propTypes = {
  children: PropTypes.func.isRequired
};

class BroadcasterProvider extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <FirestoreDocument
        path="broadcasters/avalonstar"
        render={({ isLoading, data }) => (isLoading ? null : children(data))}
      />
    );
  }
}

BroadcasterProvider.propTypes = propTypes;

export default BroadcasterProvider;
