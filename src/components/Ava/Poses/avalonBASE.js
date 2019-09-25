import React from 'react';

import { url, path } from './constants';

function Pose() {
  return <img src={`${url}${path}/avalonBASE.png`} alt="avalonBASE" />;
}

export default Pose;
