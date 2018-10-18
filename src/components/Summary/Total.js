import React from 'react';
import PropTypes from 'prop-types';

import * as Providers from 'providers';

import styled from 'styled-components';
import { ChevronRight } from 'react-feather';

const statisticPropTypes = {
  score: PropTypes.number.isRequired,
  goal: PropTypes.shape({}).isRequired
};

const Statistic = ({ score, goal }) => {
  const { minimum_score: next } = goal;
  return (
    <Stat>
      {score}/{next}
    </Stat>
  );
};

const Total = () => (
  <Wrapper>
    <Title>
      <ChevronRight color="#eaf56b" size={18} />
      {'Next Emote'}
    </Title>
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

export default Total;

Statistic.propTypes = statisticPropTypes;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;

  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
  border-radius: 4px;
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  text-transform: uppercase;
  transition: all 250ms ${props => props.theme.easing};
  white-space: nowrap;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 14px;

  color: ${props => props.theme.colors.gray[18]};
  font-family: ${props => props.theme.fonts.din};
  font-weight: 600;
`;

const Stat = styled.div`
  margin-left: 0;
  padding: 10px 14px;

  box-shadow: inset 1px 0 0 0 ${props => props.theme.colors.gray[6]};
  font-weight: 800;
`;
