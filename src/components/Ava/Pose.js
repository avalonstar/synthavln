import React from 'react';
import PropTypes from 'prop-types';
import Spritesheet from 'react-responsive-spritesheet';

import { url, path } from './constants';
import poses from './poses';

function Pose({ name, onPlay, onComplete }) {
  return (
    <Spritesheet
      image={`${url}${path}/${name}.png`}
      widthFrame={321}
      heightFrame={439}
      steps={poses[name].steps}
      fps={30}
      autoplay={false}
      isResponsive={false}
      onInit={spritesheet => spritesheet.play()}
      onPlay={() => onPlay(name)}
      onPause={() => onComplete(name)}
    />
  );
}

Pose.propTypes = {
  name: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default Pose;
