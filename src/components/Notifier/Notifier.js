import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

function Notifier({ className, notifications, onComplete, soundOnly }) {
  return (
    <Item
      className={className}
      notification={notifications[0]}
      onComplete={onComplete}
      soundOnly={soundOnly}
    />
  );
}

Notifier.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired,
  soundOnly: PropTypes.bool,
};

Notifier.defaultProps = {
  className: '',
  soundOnly: false,
};

export default Notifier;
