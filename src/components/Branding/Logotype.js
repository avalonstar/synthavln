import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import { keyframes, easing } from 'popmotion';

import styled from 'styled-components';
import colors from 'styles/colors';

import logo from './assets/logo.png';

const propTypes = {
  isVisible: PropTypes.bool
};

const defaultProps = {
  isVisible: false
};

const animationDelay = 600;

const charKeyframes = (from, to) =>
  keyframes({
    values: [from, '#00EAC9', '#02FA7B', '#FFF583', to],
    times: [0, 0.5, 0.75, 0.85, 1],
    duration: 600,
    easing: easing.anticipate
  });

const charPoses = {
  exit: {
    color: colors.gray[2]
  },
  enter: {
    color: colors.white,
    delay: ({ charIndex }) => animationDelay + charIndex * 20,
    transition: { color: ({ from, to }) => charKeyframes(from, to) }
  }
};

const Logotype = ({ isVisible }) => (
  <Wrapper>
    <Avocado
      src={logo}
      initialPose="exit"
      pose={isVisible ? 'enter' : 'exit'}
    />
    <SplitText
      charPoses={charPoses}
      initialPose="exit"
      pose={isVisible ? 'enter' : 'exit'}
    >
      Avalonstar
    </SplitText>
    <Period initialPose="exit" pose={isVisible ? 'enter' : 'exit'}>
      .
    </Period>
  </Wrapper>
);

Logotype.propTypes = propTypes;
Logotype.defaultProps = defaultProps;

const avocadoPoses = {
  exit: { x: '-200%' },
  enter: {
    x: '0%',
    delay: animationDelay,
    transition: { type: 'spring', damping: 12 }
  }
};

const periodPoses = {
  exit: { opacity: 0, transform: 'rotate(-180deg) scale(3)' },
  enter: {
    opacity: 1,
    transform: 'rotate(0deg) scale(1)',
    delay: animationDelay,
    transition: { type: 'spring' }
  }
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 36px;

  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
`;

const Avocado = styled(posed.img(avocadoPoses))`
  margin-right: 8px;
  width: 28px;
  height: 28px;
`;

const Period = styled(posed.span(periodPoses))`
  color: ${props => props.theme.colors.green[0]};
`;

export default Logotype;
