import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import styled from 'styled-components';

function Timer({ className, timeLeft }) {
  return (
    <Wrapper className={className}>
      <Bar>
        <Indicator style={{ width: `${(timeLeft / 300) * 100}%` }} />
        <Well />
      </Bar>
    </Wrapper>
  );
}

Timer.propTypes = {
  className: PropTypes.string,
  timeLeft: PropTypes.number.isRequired
};

Timer.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  position: relative;
`;

const Bar = styled.div`
  position: relative;
  width: 100%;
`;

const Well = styled.div`
  height: 6px;
  background-color: ${props => props.theme.colors.main.dark};
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;
  height: 1px;
  will-change: width;

  background-color: ${props => props.theme.colors.main.avapurple};
  transition: all 250ms ${props => props.theme.easing};
`;

export default Timer;
