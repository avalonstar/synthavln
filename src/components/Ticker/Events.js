import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Gift, Star } from 'react-feather';

import { getCheermoteURL } from './utils';

const cheerPropTypes = {
  amount: PropTypes.string.isRequired
};

const followPropTypes = {
  event: PropTypes.string.isRequired
};

const mysteryGiftPropTypes = {
  amount: PropTypes.string.isRequired
};

const raidPropTypes = {
  event: PropTypes.string.isRequired
};

const resubPropTypes = {
  months: PropTypes.number.isRequired
};

const subGiftPropTypes = {
  gifter: PropTypes.string.isRequired
};

const tipPropTypes = {
  formattedAmount: PropTypes.string.isRequired
};

export const CheerEvent = ({ amount }) => (
  <Wrapper>
    {amount}
    <Cheermote alt={amount} src={getCheermoteURL(amount)} />
  </Wrapper>
);

export const FollowEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const MysteryGiftEvent = ({ amount }) => (
  <Wrapper>
    <Gift size={18} />
    {'\u00D7'}
    {amount}
  </Wrapper>
);

export const SubscriptionEvent = () => (
  <Wrapper>
    <Star size={18} />
  </Wrapper>
);

export const SubGiftEvent = ({ gifter }) => (
  <Wrapper>
    <Actor>{gifter}</Actor>
    <Gift size={18} />
  </Wrapper>
);

export const RaidEvent = ({ event }) => <Wrapper>{event}</Wrapper>;

export const ResubEvent = ({ months }) => (
  <Wrapper>
    <Star size={18} />
    {'\u00D7'}
    {months}
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
SubGiftEvent.propTypes = subGiftPropTypes;
TipEvent.propTypes = tipPropTypes;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Cheermote = styled.img`
  height: 18px;
  padding-left: 4px;
`;

const Actor = styled.div`
  padding-right: 4px;
`;
