import React from 'react';

import styled from 'styled-components';
import { Gift, Star } from 'react-feather';

import { getCheermoteURL } from './utils';

export const CheerEvent = props => (
  <Wrapper>
    {props.amount}
    <Cheermote alt={props.amount} src={getCheermoteURL(props.amount)} />
  </Wrapper>
);

export const FollowEvent = props => <Wrapper>{props.event}</Wrapper>;

export const HostEvent = props => <Wrapper>{props.event}</Wrapper>;

export const MysteryGiftEvent = props => (
  <Wrapper>
    <Actor>{props.gifter}</Actor>
    <Gift size={18} />
    {'\u00D7'}
    {props.amount}
  </Wrapper>
);

export const SubscriptionEvent = props => (
  <Wrapper>
    <Star size={18} />
  </Wrapper>
);

export const SubGiftEvent = props => (
  <Wrapper>
    <Actor>{props.gifter}</Actor>
    <Gift size={18} />
  </Wrapper>
);

export const RaidEvent = props => <Wrapper>{props.event}</Wrapper>;

export const ResubEvent = props => (
  <Wrapper>
    <Star size={18} />
    {'\u00D7'}
    {props.months}
  </Wrapper>
);

export const TipEvent = props => (
  <Wrapper>
    {props.formattedAmount}
    {' tip'}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Cheermote = styled.img`
  height: 18px;
`;

const Actor = styled.div`
  padding-right: 4px;
`;

const Icon = styled.span``;
