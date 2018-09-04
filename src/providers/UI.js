import React, { PureComponent } from 'react';
import { withFirestore } from 'react-firestore';

import UIContext from 'contexts';

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
    this.props.firestore
      .collection('uxc')
      .doc('avalonstar')
      .onSnapshot(snapshot => {
        const { eventToggles } = snapshot.data();
        const whitelistedEvents = Object.keys(eventToggles).filter(
          key => eventToggles[key]
        );
        this.setState({ eventToggles, whitelistedEvents });
      });
  }

  render() {
    return (
      <UIContext.Provider value={this.state}>
        {this.props.children}
      </UIContext.Provider>
    );
  }
}

export default withFirestore(UIProvider);
