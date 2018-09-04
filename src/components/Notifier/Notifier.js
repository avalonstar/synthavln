import React, { PureComponent } from 'react';

import Item from './Item';

class Notifier extends PureComponent {
  render() {
    return (
      <Item
        className={this.props.className}
        notification={this.props.notifications[0]}
        onComplete={this.props.onComplete}
        soundOnly={this.props.soundOnly}
      />
    );
  }
}

export default Notifier;
