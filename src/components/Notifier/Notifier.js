import React from 'react';
import PropTypes from 'prop-types';

import { useNotificationContext } from 'providers';

import Item from './Item';

function Notifier({ className, soundOnly }) {
  const [notifications] = useNotificationContext();
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
  soundOnly: PropTypes.bool
};

Notifier.defaultProps = {
  className: '',
  soundOnly: false
};

export default Notifier;
