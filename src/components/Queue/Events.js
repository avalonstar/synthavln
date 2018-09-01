import React from 'react';

import styled from 'styled-components';
import { Bell, Star } from 'react-feather';

export const CheerEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>
      {props.amount}
      {' bits'}
    </Label>
  </Wrapper>
);

export const FollowEvent = props => (
  <Wrapper>
    <Label>{props.event}</Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

export const HostEvent = props => (
  <Wrapper>
    <Label>{props.event}</Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

export const MysteryGiftEvent = props => (
  <Wrapper>
    <Label>
      {props.event}
      {' \u00D7'}
      {props.amount}
    </Label>
    <Actor>{props.gifter}</Actor>
  </Wrapper>
);

export const SubscriptionEvent = props => (
  <Wrapper>
    <Label>{props.event}</Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

export const SubGiftEvent = props => (
  <Wrapper>
    <Label>
      {props.event} from {props.gifter}
    </Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

export const RaidEvent = props => (
  <Wrapper>
    <Label>{props.event}</Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

export const ResubEvent = props => (
  <Wrapper>
    <Label>
      resub {'\u00D7'}
      {props.months}
    </Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

export const TipEvent = props => (
  <Wrapper>
    <Label>
      {props.formattedAmount}
      {' tip'}
    </Label>
    <Actor>{props.name}</Actor>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  padding: 12px;
  white-space: nowrap;

  background-color: ${props => props.theme.colors.gray[2]};
`;

const Icon = styled.div`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Actor = styled.div`
  font-weight: 800;
  text-transform: uppercase;
  padding-left: 8px;
`;

const Label = styled.div`
  color: ${props => props.theme.colors.gray[12]};
  font-family: ${props => props.theme.fonts.din};
  font-weight: 600;
  text-transform: uppercase;
`;

const Cheermote = styled.img`
  height: 18px;
`;
