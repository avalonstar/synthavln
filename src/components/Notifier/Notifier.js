import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

const propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired,
  soundOnly: PropTypes.bool
};

const defaultProps = {
  className: '',
  soundOnly: false
};

class Notifier extends PureComponent {
  render() {
    const { className, notifications, onComplete, soundOnly } = this.props;
    return (
      <Item
        className={className}
        notification={notifications[0]}
        onComplete={onComplete}
        soundOnly={soundOnly}
      />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

export default Notifier;
