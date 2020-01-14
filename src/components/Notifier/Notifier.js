import React from 'react';
import PropTypes from 'prop-types';

import { useNotificationContext } from 'providers';

import Item from './Item';

function Notifier(props) {
  const { className } = props;
  const [notifications] = useNotificationContext();
  return <Item className={className} notification={notifications[0]} />;
}

Notifier.propTypes = {
  className: PropTypes.string
};

Notifier.defaultProps = {
  className: ''
};

export default Notifier;
