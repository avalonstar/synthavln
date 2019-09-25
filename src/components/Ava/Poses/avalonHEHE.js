import React from 'react';
import PropTypes from 'prop-types';

import Spritesheet from 'react-responsive-spritesheet';

import { url, path } from './constants';

function Pose() {
  return (
    <Spritesheet
      image={`${url}${path}/avalonHEHE.png`}
      widthFrame={321}
      heightFrame={439}
      steps={51}
      fps={24}
      autoplay
      isResponsive={false}
    />
  );
}

Pose.propTypes = {
  callback: PropTypes.func.isRequired
};

export default Pose;
