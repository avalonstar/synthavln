import React, { Component } from 'react';

import Item from './Item';

class Notifier extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications[0] !== this.props.notifications[0];
  }

  render() {
    return (
      <Item
        className={this.props.className}
        notification={this.props.notifications[0]}
        onComplete={this.props.onComplete}
      />
    );
  }
}

export default Notifier;
