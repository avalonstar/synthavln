/* eslint-disable react/no-unused-state */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withFirestore } from 'react-firestore';

import UIContext from 'contexts';

const propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired
};

const defaultEventToggles = {
  cheer: true,
  follow: true,
  host: false,
  mysterygift: true,
  raid: true,
  resub: true,
  subgift: true,
  subscription: true,
  tip: true
};

class UIProvider extends PureComponent {
  state = {
    eventToggles: defaultEventToggles,
    whitelistedEvents: []
  };

  componentDidMount() {
    const { firestore } = this.props;
    const collection = firestore.collection('uxc').doc('avalonstar');
    collection.onSnapshot(snapshot => {
      const { eventToggles, game } = snapshot.data();
      const whitelistedEvents = Object.keys(eventToggles).filter(
        key => eventToggles[key]
      );
      this.setState({ eventToggles, game, whitelistedEvents });
    });
  }

  render() {
    const { children } = this.props;
    return (
      <UIContext.Provider value={this.state}>{children}</UIContext.Provider>
    );
  }
}

UIProvider.propTypes = propTypes;

export default withFirestore(UIProvider);
