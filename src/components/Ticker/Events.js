import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getTier } from './utils';

const cheerPropTypes = {
  amount: PropTypes.string.isRequired
};

const followPropTypes = {
  event: PropTypes.string.isRequired
};

const mysteryGiftPropTypes = {
  amount: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const raidPropTypes = {
  event: PropTypes.string.isRequired
};

const resubPropTypes = {
  months: PropTypes.number.isRequired,
  subPlan: PropTypes.string.isRequired
};

const subscriptionPropTypes = {
  subPlan: PropTypes.string.isRequired
};

const subGiftPropTypes = {
  gifter: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const tipPropTypes = {
  formattedAmount: PropTypes.string.isRequired
};

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

export const SubGiftEvent = ({ gifter, subPlan }) => (
  <Wrapper>
    {getTier(subPlan)} {'gift from '}
    <Actor>{gifter}</Actor>
  </Wrapper>
);

export const RaidEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const ResubEvent = ({ months, subPlan }) => (
  <Wrapper>
    <Number>{months}</Number>
    {' months'} {getTier(subPlan)}
  </Wrapper>
);

export const TipEvent = ({ formattedAmount }) => (
  <Wrapper>{formattedAmount}</Wrapper>
);

CheerEvent.propTypes = cheerPropTypes;
FollowEvent.propTypes = followPropTypes;
MysteryGiftEvent.propTypes = mysteryGiftPropTypes;
RaidEvent.propTypes = raidPropTypes;
ResubEvent.propTypes = resubPropTypes;
SubscriptionEvent.propTypes = subscriptionPropTypes;
SubGiftEvent.propTypes = subGiftPropTypes;
TipEvent.propTypes = tipPropTypes;

const Wrapper = styled.div`
  white-space: nowrap;
`;

const Actor = styled.div`
  color: ${props => props.theme.colors.muted.yellow};
  display: inline;
`;

const Number = styled.span`
  color: ${props => props.theme.colors.muted.yellow};
`;
