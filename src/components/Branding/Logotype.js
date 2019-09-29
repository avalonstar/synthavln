import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spritesheet from 'react-responsive-spritesheet';

import { useTrainContext } from 'providers';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const url = 'https://synthform.s3.us-east-1.amazonaws.com';

function Logotype({ className }) {
  const { isTrainActive } = useTrainContext();
  const [isVisible, setIsVisible] = useState(true);
  const [spritesheet, setSpritesheet] = useState(null);

  useEffect(() => {
    if (spritesheet && isVisible) spritesheet.play();
    setIsVisible(!isTrainActive);
  }, [isTrainActive, isVisible, spritesheet]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Wrapper>
            <Spritesheet
              image={`${url}/images/avalonstar/logo.png`}
              widthFrame={288}
              heightFrame={60}
              steps={120}
              fps={30}
              getInstance={s => setSpritesheet(s)}
            />
          </Wrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Logotype.propTypes = {
  className: PropTypes.string
};

Logotype.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  position: relative;
  top: -1px;
  width: 140px;
`;

export default Logotype;
