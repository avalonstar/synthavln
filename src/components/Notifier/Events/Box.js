import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toPath from 'element-to-path';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { rgba } from 'polished';

function Box({ width, height, fill, delay, duration }) {
  const rx = 4;
  const rect = {
    name: 'rect',
    attributes: {
      x: 1,
      y: 1,
      width: width - rx / 2,
      height: height - rx / 2,
      rx
    }
  }; 
  const variants = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(102, 68, 233, 0)'
    },
    visible: {
      pathLength: 1,
      fill: `rgba(102, 68, 233, ${fill ? 1 : 0})`
    }
  };

  return (
    <SVG width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path
        fill="rgba(102, 68, 233, 0)"
        d={toPath(rect)}
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration, delay, ease: 'easeOut' },
          fill: { duration, ease: [1, 0, 0.8, 1] }
        }}
      />
    </SVG>
  );
}

Box.propTypes = {
  delay: PropTypes.number,
  duration: PropTypes.number.isRequired,
  fill: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number
}

Box.defaultProps = {
  delay: 0,
  fill: false,
  height: 104,
  width: 576
}

const SVG = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Path = styled(motion.path)`
  stroke: ${props => rgba(props.theme.colors.main.avapurple, 0.75)};
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: 4;
`;

export default Box;
