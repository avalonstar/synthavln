import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { easing } from 'popmotion';

import styled from 'styled-components';
import { Heart } from 'react-feather';

const propTypes = {
  isVisible: PropTypes.boolean
};

const defaultProps = {
  isVisible: false
};

const Summary = ({ isVisible }) => (
  <Wrapper initialPose="exit" pose={isVisible ? 'enter' : 'exit'}>
    <Heart size={18} />
    <Stat>
      <strong>5 new</strong> crusaders!
    </Stat>
  </Wrapper>
);

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

const summaryPoses = {
  exit: { opacity: 0, x: '200%' },
  enter: {
    opacity: 1,
    x: '0%',
    transition: { easing: easing.anticipate }
  }
};

const Wrapper = styled(posed.div(summaryPoses))`
  display: flex;
  align-items: center;
  margin-left: 12px;
  padding: 8px 16px;

  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
  border-radius: 36px;
  color: ${props => props.theme.colors.white};
  font-size: 14px;
  text-transform: uppercase;
  transition: all 250ms ${props => props.theme.easing};
  opacity: 0;
  white-space: nowrap;

  strong {
    font-weight: 800;
  }
`;

const Stat = styled.div`
  margin-left: 4px;
`;

export default Summary;
