import { useEffect, useState } from 'react';
import createContainer from 'constate';

import firestore from 'firestore';

import { useDocument } from 'react-firebase-hooks/firestore';

function useUI() {
  const [mode, setMode] = useState('variety');
  const [value, loading] = useDocument(
    firestore.firestore().doc('uxc/avalonstar')
  );

  useEffect(() => {
    if (!loading && value) {
      setMode(value.data().mode);
    }
  }, [loading, value]);

  return { mode };
}

const UIContainer = createContainer(useUI);

export default UIContainer;
