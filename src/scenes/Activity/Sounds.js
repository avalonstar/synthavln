import React from 'react';

import { Notifier } from 'components';
import * as Providers from 'providers';

const Scene = props => (
  <Providers.Events>
    {props => (
      <Notifier
        notifications={props.notifications}
        onComplete={props.onComplete}
        soundOnly
      />
    )}
  </Providers.Events>
);

export default Scene;
