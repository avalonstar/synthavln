import { addSeconds, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

function Train({ className, count, timeLeft, state }) {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (state === 'train') {
      setIsVisible(true);
    } else if (state === 'idle') {
      setIsVisible(false);
    }
  }, [state]);

  useEffect(() => {
    const helper = addSeconds(new Date(0), timeLeft);
    setTimer(format(helper, 'mm:ss'));
  }, [timeLeft]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Wrapper
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Widget>
            <Count>{count}</Count>
            <Timer>{timer}</Timer>
          </Widget>
        </Wrapper>
      )}{' '}
    </AnimatePresence>
  );
}

Train.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  state: PropTypes.string
};

Train.defaultProps = {
  className: '',
  state: 'idle'
};

const Wrapper = styled(motion.div)`
  position: relative;
`;

const Widget = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  align-items: center;

  font-family: ${props => props.theme.fonts.adelle};
`;

const Count = styled.div`
  padding-left: 12px;
  padding-right: 6px;
  color: ${props => props.theme.colors.main.avayellow};
  font-weight: 800;
`;

const Timer = styled.div`
  color: ${props => props.theme.colors.white};
`;

export default Train;
