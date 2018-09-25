import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { easing } from 'popmotion';

import * as Providers from 'providers';

import styled from 'styled-components';
import { Heart } from 'react-feather';

const propTypes = {
  isVisible: PropTypes.bool
};

const defaultProps = {
  isVisible: false
};

const statisticPropTypes = {
  score: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired
};

const Statistic = ({ score, goal }) => {
  const { minimum_score: next, emoticon_limit: slot } = goal;
  return (
    <Stat>
      <Heart color="#eaf56b" size={18} />
      {score}/{next}
    </Stat>
  );
};

const Summary = ({ isVisible }) => (
  <Wrapper initialPose="exit" pose={isVisible ? 'enter' : 'exit'}>
    <Title>Next Emote</Title>
    <Providers.Broadcaster>
      {({ subscriptions }) => (
        <Statistic
          score={subscriptions.score}
          goal={subscriptions.next_level}
        />
      )}
    </Providers.Broadcaster>
  </Wrapper>
);

Statistic.propTypes = statisticPropTypes;
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

  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
  border-radius: 36px;
  color: ${props => props.theme.colors.white};
  font-size: 14px;
  text-transform: uppercase;
  transition: all 250ms ${props => props.theme.easing};
  opacity: 0;
  white-space: nowrap;
`;

const Title = styled.div`
  padding: 8px 12px 8px 16px;
  color: ${props => props.theme.colors.gray[18]};
  font-family: ${props => props.theme.fonts.din};
  font-weight: 600;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;
  padding: 8px 16px 8px 12px;

  box-shadow: inset 1px 0 0 0 ${props => props.theme.colors.gray[6]};
  font-weight: 800;

  svg {
    margin-right: 4px;
  }
`;

export default Summary;
