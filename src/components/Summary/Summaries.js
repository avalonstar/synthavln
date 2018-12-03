import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { easing } from 'popmotion';

import styled from 'styled-components';

import Daily from './Daily';

const propTypes = {
  isVisible: PropTypes.bool
};

const defaultProps = {
  isVisible: false
};

const Summaries = ({ isVisible }) => (
  <Wrapper initialPose="exit" pose={isVisible ? 'enter' : 'exit'}>
    <Daily />
  </Wrapper>
);

Summaries.propTypes = propTypes;
Summaries.defaultProps = defaultProps;

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
`;

export default Summaries;
