import { useEffect, useState } from 'react';
import createUseContext from 'constate';

import { useDocument } from 'react-firebase-hooks/firestore';

import firestore from 'firestore';

function useUI() {
  const [mode, setMode] = useState('variety');
  const [value, loading] = useDocument(
    firestore.firestore().doc('uxc/avalonstar')
  );

  useEffect(() => {
    if (!loading && value) setMode(value.data().mode);
  }, [loading, value]);

  return { mode };
}

const useUIContext = createUseContext(useUI);

export default useUIContext;
