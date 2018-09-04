import React from 'react';
import PropTypes from 'prop-types';

import { Notifier } from 'components';
import * as Providers from 'providers';

const propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired
};

const Scene = () => (
  <Providers.Events>
    {({ notifications, onComplete }) => (
      <Notifier
        notifications={notifications}
        onComplete={onComplete}
        soundOnly
      />
    )}
  </Providers.Events>
);

Providers.Events.propTypes = propTypes;

export default Scene;
