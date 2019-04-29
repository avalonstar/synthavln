import React, { useContext } from 'react';

import { Notifier } from 'components';
import { Events, Notifications } from 'providers';

function NotificationsArea() {
  const [notifications] = useContext(Notifications.Context);
  return <Notifier notifications={notifications} soundOnly />;
}

function Scene() {
  return (
    <Notifications.Provider>
      <Events.Provider>
        <NotificationsArea />
      </Events.Provider>
    </Notifications.Provider>
  );
}

export default Scene;
