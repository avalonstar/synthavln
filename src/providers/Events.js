import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import createUseContext from 'constate';

import firestore from 'firestore';

import useNotificationContext from './Notifications';

function useEvents() {
  const [, dispatch] = useNotificationContext();
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
          dispatch({ type: 'add', event: change.doc.data() });
        }
      });
    }
  });

  return { events };
}

const useEventContext = createUseContext(useEvents);

export default useEventContext;
