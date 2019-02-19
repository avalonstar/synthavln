import createContainer from 'constate';
import { useDocument } from 'react-firebase-hooks/firestore';

import firestore from 'firestore';

function useBroadcaster() {
  const { loading, value } = useDocument(
    firestore.firestore().doc('broadcasters/avalonstar')
  );

  return { value: loading ? null : value };
}

const BroadcasterContainer = createContainer(useBroadcaster);

export default BroadcasterContainer;
