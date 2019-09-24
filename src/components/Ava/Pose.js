import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spritesheet from 'react-responsive-spritesheet';

import { url, path } from './constants';
import poses from './poses';

function Pose({ name, callback }) {
  const [spritesheet, setSpritesheet] = useState(null);

  useEffect(() => {
    if (spritesheet) {
      spritesheet.play();
    }
  }, [spritesheet]);

  return (
    <Spritesheet
      image={`${url}${path}/${name}.png`}
      widthFrame={321}
      heightFrame={439}
      steps={poses[name].steps}
      fps={30}
      autoplay={false}
      isResponsive={false}
      getInstance={spritesheet => {
        setSpritesheet(spritesheet);
      }}
      onPlay={() => {
        console.log('onPlay');
      }}
      onPause={() => {
        callback();
      }}
    />
  );
}

Pose.propTypes = {
  name: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default Pose;
