import React from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

function Notifier({ className, notifications, soundOnly }) {
  return (
    <Item
      className={className}
      notification={notifications[0]}
      soundOnly={soundOnly}
    />
  );
}

Notifier.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  soundOnly: PropTypes.bool
};

Notifier.defaultProps = {
  className: '',
  soundOnly: false
};

export default Notifier;
