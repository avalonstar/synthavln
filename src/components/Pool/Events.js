import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getTier } from './utils';

export const CheerEvent = ({ count }) => (
  <Wrapper>
    <Number>{count}</Number>
    {' bits'}
  </Wrapper>
);

export const FollowEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const MysteryGiftEvent = ({ count, plan }) => (
  <Wrapper>
    <Number>{count}</Number> {getTier(plan)} {'gifts'}
  </Wrapper>
);

export const SubscriptionEvent = ({ plan }) => (
  <Wrapper>{getTier(plan)}</Wrapper>
);

export const SubGiftEvent = ({ name, plan }) => (
  <Wrapper>
    {getTier(plan)} {'gift from '}
    <Actor>{name}</Actor>
  </Wrapper>
);

export const RaidEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const ResubEvent = ({ months, plan }) => (
  <Wrapper>
    <Number>{months}</Number>
    {' months'} {getTier(plan)}
  </Wrapper>
);

export const TipEvent = ({ formattedcount }) => (
  <Wrapper>{formattedcount}</Wrapper>
);

CheerEvent.propTypes = {
  count: PropTypes.string.isRequired
};

FollowEvent.propTypes = {
  event: PropTypes.string.isRequired
};

MysteryGiftEvent.propTypes = {
  count: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired
};

RaidEvent.propTypes = {
  event: PropTypes.string.isRequired
};

ResubEvent.propTypes = {
  months: PropTypes.number.isRequired,
  plan: PropTypes.string.isRequired
};

SubscriptionEvent.propTypes = {
  plan: PropTypes.string.isRequired
};

SubGiftEvent.propTypes = {
  name: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired
};

TipEvent.propTypes = {
  formattedcount: PropTypes.string.isRequired
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
