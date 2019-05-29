import React, { useContext } from 'react';

import { Ava } from 'components';
import { UI } from 'providers';

function Scene() {
  const { mode } = useContext(UI.Context);
  return <Ava mode={mode} />;
}

export default Scene;
