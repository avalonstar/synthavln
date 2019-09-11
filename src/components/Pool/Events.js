import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getTier } from './utils';

export const CheerEvent = ({ amount }) => (
  <Wrapper>
    <Number>{amount}</Number>
    {' bits'}
  </Wrapper>
);

export const FollowEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const MysteryGiftEvent = ({ amount, subPlan }) => (
  <Wrapper>
    <Number>{amount}</Number> {getTier(subPlan)} {'gifts'}
  </Wrapper>
);

export const SubscriptionEvent = ({ subPlan }) => (
  <Wrapper>{getTier(subPlan)}</Wrapper>
);

export const SubGiftEvent = ({ displayName, subPlan }) => (
  <Wrapper>
    {getTier(subPlan)} {'gift from '}
    <Actor>{displayName}</Actor>
  </Wrapper>
);

export const RaidEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const ResubEvent = ({ cumulativeMonths, subPlan }) => (
  <Wrapper>
    <Number>{cumulativeMonths}</Number>
    {' months'} {getTier(subPlan)}
  </Wrapper>
);

export const TipEvent = ({ formattedAmount }) => (
  <Wrapper>{formattedAmount}</Wrapper>
);

export const UpgradeEvent = () => <Wrapper>Gift Converted</Wrapper>;

CheerEvent.propTypes = {
  amount: PropTypes.string.isRequired
};

FollowEvent.propTypes = {
  event: PropTypes.string.isRequired
};

MysteryGiftEvent.propTypes = {
  amount: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

RaidEvent.propTypes = {
  event: PropTypes.string.isRequired
};

ResubEvent.propTypes = {
  cumulativeMonths: PropTypes.number.isRequired,
  subPlan: PropTypes.string.isRequired
};

SubscriptionEvent.propTypes = {
  subPlan: PropTypes.string.isRequired
};

SubGiftEvent.propTypes = {
  displayName: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

TipEvent.propTypes = {
  formattedAmount: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  white-space: nowrap;
`;

const Actor = styled.div`
  color: ${props => props.theme.colors.main.avagreen};
  display: inline;
  text-transform: initial;
`;

const Number = styled.span`
  color: ${props => props.theme.colors.main.avagreen};
`;
