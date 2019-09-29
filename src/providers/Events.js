import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import createUseContext from 'constate';

import useNotificationContext from './Notifications';
import usePoolContext from './Pool';

import firestore from 'firestore';

function useEvents() {
  const [, dispatchToNotifictions] = useNotificationContext();
  const [, dispatchToPool] = usePoolContext();
  const [events, setEvents] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [value, loading] = useCollection(
    firestore
      .firestore()
      .collection('broadcasters')
      .doc('avalonstar')
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
          dispatchToNotifictions({ type: 'add', event: change.doc.data() });
          if (change.doc.data().bucket === 'subscription')
            dispatchToPool({ type: 'add', event: change.doc.data() });
        }
      });
    }
  });

  return { events };
}

const useEventContext = createUseContext(useEvents, value => [value.events]);

export default useEventContext;
