import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTrainContext } from 'providers';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const baseUrl =
  'https://synthform.s3.us-east-1.amazonaws.com/images/avalonstar/';

const images = {
  idle: 'avalonSTAR',
  train: 'avalonFIESTA',
  carousel: [
    'avalonBLANK',
    'avalonBLESS',
    'avalonBLUSH',
    'avalonCOZY',
    'avalonHAPPY'
  ]
};

function Logo({ className }) {
  const { isTrainActive } = useTrainContext();
  const [image, setImage] = useState('avalonSTAR');

  useEffect(() => {
    if (isTrainActive) {
      setImage(images.train);
    } else {
      setImage(images.idle);
    }
  }, [isTrainActive]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Wrapper className={className}>
        <Image
          key={image}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          src={`${baseUrl}${image}.png`}
        />
      </Wrapper>
    </AnimatePresence>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired
};

const Wrapper = styled(motion.div)`
  align-items: center;
  position: relative;
`;

const Image = styled(motion.img)`
  margin-right: 6px;
  width: 36px;
  height: 36px;
  will-change: transform;
`;

export default Logo;
