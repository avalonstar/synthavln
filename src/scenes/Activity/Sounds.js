import React, { useContext } from 'react';

import { Notifier } from 'components';
import { Events, useNotificationContext } from 'providers';

function NotificationsArea() {
  const [notifications] = useNotificationContext();
  return <Notifier notifications={notifications} soundOnly />;
}

function Scene() {
  return (
    <useNotificationContext.Provider>
      <Events.Provider>
        <NotificationsArea />
      </Events.Provider>
    </useNotificationContext.Provider>
  );
}

export default Scene;
