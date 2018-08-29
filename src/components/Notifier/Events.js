import React from 'react';

import styled from 'styled-components';
import { rgba } from 'polished';
import {
  Gift,
  Star,
  Circle,
  Heart,
  PlusSquare,
  TrendingUp
} from 'react-feather';

const getSubPlan = plan =>
  ({
    1000: 'Tier 1',
    2000: 'Tier 2',
    3000: 'Tier 3',
    Prime: 'Prime'
  }[plan]);

export const CheerEvent = props => (
  <Wrapper>
    <Label>{props.event}</Label>
    {props.amount}
  </Wrapper>
);

export const FollowEvent = props => <Wrapper>{props.event}</Wrapper>;

export const HostEvent = props => <Wrapper>{props.event}</Wrapper>;

export const MysteryGiftEvent = props => (
  <Wrapper>
    <Label>{props.event}</Label>
    <Actor>{props.gifter}</Actor>
    <Gift size={18} />
    {'\u00D7'}
    {props.amount}
  </Wrapper>
);

export const SubscriptionEvent = props => (
  <Wrapper>
    <Actor>{props.username}</Actor>
    <Label>{props.event}</Label>
  </Wrapper>
);

export const SubGiftEvent = props => (
  <Wrapper>
    <Aside>test</Aside>
    <Content>
      <Header>
        <Actor>{props.gifter}</Actor>
        {' gifted '}
        <Actor>{props.username}</Actor>
        {' a subscription!'}
      </Header>
      <Footer>
        <Tag>
          <Gift size={16} />
          subgift
        </Tag>
        <Tag>
          <Heart size={16} />
          {getSubPlan(props.subPlan)}
        </Tag>
        <Tag>
          <PlusSquare size={16} /> SP UP
        </Tag>
      </Footer>
    </Content>
  </Wrapper>
);

export const RaidEvent = props => <Wrapper>{props.event}</Wrapper>;

export const ResubEvent = props => (
  <Wrapper>
    <Star />
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
  display: inline-grid;
  grid-template-columns: auto 1fr;

  /* background-color: ${props => props.theme.colors.gray[2]}; */
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.gotham};
  font-weight: 400;

  margin-left: 36px;

  border-radius: 4px;

  align-items: center;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const Aside = styled.div`
  grid-column: 1;
  padding: 24px;

  background: red;
  align-self: stretch;
`;

const Content = styled.div`
  grid-column: 2;
  padding: 0 24px;
`;

const Header = styled.div`
  padding: 24px 0;
  color: ${props => props.theme.colors.gray[10]};
  font-size: 18px;
`;

const Footer = styled.div`
  grid-column: 2;
  padding: 24px 0;

  display: flex;
  align-items: center;
  box-shadow: inset 0 1px 0 ${props => props.theme.colors.gray[20]};
  color: ${props => props.theme.colors.gray[16]};
  font-size: 14px;
  font-weight: 700;
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 6px;

  /* box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[20]}; */
  color: ${props => props.theme.colors.gray[20]};
  border-radius: 2px;
  text-transform: uppercase;

  svg {
    padding-right: 4px;
  }
`;

const Icon = styled.div`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Type = styled.div`
  display: inline;
  color: ${props => props.theme.colors.white};
  font-weight: 700;
  text-transform: uppercase;
`;

const Actor = styled.span`
  text-transform: uppercase;
  font-weight: 800;
`;

const Label = styled.div`
  font-size: 14px;
  text-transform: uppercase;
`;

const Cheermote = styled.img`
  height: 18px;
`;
