import React from 'react';

import { Notifier } from 'components';
import { useEventContext, useNotificationContext } from 'providers';

function NotificationsArea() {
  const [notifications] = useNotificationContext();
  return <Notifier notifications={notifications} soundOnly />;
}

function Scene() {
  return (
    <useNotificationContext.Provider>
      <useEventContext.Provider>
        <NotificationsArea />
      </useEventContext.Provider>
    </useNotificationContext.Provider>
  );
}

export default Scene;
