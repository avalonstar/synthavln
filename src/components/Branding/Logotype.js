import React from 'react';

import Indicator from './Indicator';

import { keyframes, easing } from 'popmotion';
import SplitText from 'react-pose-text';
import styled from 'styled-components';
import colors from 'styles/colors';

import logo from './logo.png';

const Logotype = props => (
  <Wrapper>
    <Avocado src={logo} />
    <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
      Avalonstar.
    </SplitText>
  </Wrapper>
);

const charPoses = {
  exit: {
    color: colors.gray[3],
    opacity: 0
  },
  enter: {
    color: colors.white,
    opacity: 1,
    delay: ({ charIndex }) => charIndex * 25,
    transition: {
      color: ({ from, to }) =>
        keyframes({
          values: [from, '#ff3852', '#f437ff', '#5eccff', to],
          times: [0, 0.5, 0.75, 0.85, 1],
          duration: 500
        })
    }
  }
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 36px;

  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
`;

const Avocado = styled.img`
  margin-right: 8px;
  width: 28px;
  height: 28px;
`;

const Period = styled.span`
  color: ${props => props.theme.colors.green[0]};
`;

const StyledIndicator = styled(Indicator)`
  left: -36px;
`;

export default Logotype;
