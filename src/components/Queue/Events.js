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
    <Actor>{props.name}</Actor>
    <Label>{props.event}</Label>
  </Wrapper>
);

export const HostEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>{props.event}</Label>
  </Wrapper>
);

export const MysteryGiftEvent = props => (
  <Wrapper>
    <Actor>{props.gifter}</Actor>
    <Label>
      {props.event}
      {' \u00D7'}
      {props.amount}
    </Label>
  </Wrapper>
);

export const SubscriptionEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>{props.event}</Label>
  </Wrapper>
);

export const SubGiftEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>
      {props.event} from {props.gifter}
    </Label>
  </Wrapper>
);

export const RaidEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>{props.event}</Label>
  </Wrapper>
);

export const ResubEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>
      resub {'\u00D7'}
      {props.months}
    </Label>
  </Wrapper>
);

export const TipEvent = props => (
  <Wrapper>
    <Actor>{props.name}</Actor>
    <Label>
      {props.formattedAmount}
      {' tip'}
    </Label>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px 0 12px;
  white-space: nowrap;

  background: ${props => props.theme.colors.gray[2]};
  box-shadow: inset 1px 0 0 0 ${props => props.theme.colors.gray[4]};
`;

const Icon = styled.div`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Actor = styled.div`
  font-weight: 800;
  text-transform: uppercase;
  padding-right: 8px;
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
