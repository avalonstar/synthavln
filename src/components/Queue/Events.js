import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const cheerPropTypes = {
  amount: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const followPropTypes = {
  event: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const mysteryGiftPropTypes = {
  event: PropTypes.string.isRequired,
  gifter: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
};

const raidPropTypes = {
  event: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const resubPropTypes = {
  name: PropTypes.string.isRequired,
  months: PropTypes.number.isRequired
};

const subscriptionPropTypes = {
  event: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const subGiftPropTypes = {
  event: PropTypes.string.isRequired,
  gifter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const tipPropTypes = {
  from: PropTypes.string.isRequired,
  formattedAmount: PropTypes.string.isRequired
};

export const CheerEvent = ({ amount, name }) => (
  <Wrapper>
    <Label>
      {amount}
      {' bits'}
    </Label>
    <Actor>{name}</Actor>
  </Wrapper>
);

export const FollowEvent = ({ event, name }) => (
  <Wrapper>
    <Label>{event}</Label>
    <Actor>{name}</Actor>
  </Wrapper>
);

export const MysteryGiftEvent = ({ event, amount, gifter }) => (
  <Wrapper>
    <Label>
      {event}
      {' \u00D7'}
      {amount}
    </Label>
    <Actor>{gifter}</Actor>
  </Wrapper>
);

export const SubscriptionEvent = ({ event, name }) => (
  <Wrapper>
    <Label>{event}</Label>
    <Actor>{name}</Actor>
  </Wrapper>
);

export const SubGiftEvent = ({ event, gifter, name }) => (
  <Wrapper>
    <Label>
      {event} from {gifter}
    </Label>
    <Actor>{name}</Actor>
  </Wrapper>
);

export const RaidEvent = ({ event, name }) => (
  <Wrapper>
    <Label>{event}</Label>
    <Actor>{name}</Actor>
  </Wrapper>
);

export const ResubEvent = ({ months, name }) => (
  <Wrapper>
    <Label>
      resub {'\u00D7'}
      {months}
    </Label>
    <Actor>{name}</Actor>
  </Wrapper>
);

export const TipEvent = ({ formattedAmount, from }) => (
  <Wrapper>
    <Label>
      {formattedAmount}
      {' tip'}
    </Label>
    <Actor>{from}</Actor>
  </Wrapper>
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
  display: flex;
  align-items: baseline;
  padding: 12px;
  white-space: nowrap;

  background-color: ${props => props.theme.colors.gray[2]};
`;

const Actor = styled.div`
  font-weight: 800;
  text-transform: uppercase;
  padding-left: 8px;
`;

const Label = styled.div`
  color: ${props => props.theme.colors.gray[12]};
  font-family: ${props => props.theme.fonts.inter};
  font-weight: 600;
  text-transform: uppercase;
`;
