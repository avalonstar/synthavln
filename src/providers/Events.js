import { useContext, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import createContainer from 'constate';

import firestore from 'firestore';
import { Notifications } from 'providers';

function useEvents() {
  const [notifications, dispatch] = useContext(Notifications.Context);
  const [events, setEvents] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [value, loading] = useCollection(
    firestore
      .firestore()
      .collection('events')
      .where('muted', '==', false)
      .orderBy('timestamp', 'desc')
      .limit(10)
  );

  useEffect(() => {
    if (!loading) {
      setSnapshot(value);
      setEvents(value.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  }, [loading, value]);

  useEffect(() => {
    if (snapshot && !snapshot.isEqual(value)) {
      value.docChanges().forEach(change => {
        if (change.type === 'added') {
          dispatch({ type: 'add', event: change.doc.data() });
        }
      });
    }
  });

  useEffect(() => {
    console.log('notifications', notifications);
  }, [notifications]);

  return { events };
}

const EventsContainer = createContainer(useEvents);

export default EventsContainer;
