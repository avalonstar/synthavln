import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as Tags from './Events/Tags';
import * as Pomps from './Events/Pomps';
import * as utils from './utils';

import avalonHAPPY from './assets/avalonHAPPY.png';

const cheerPropTypes = {
  amount: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const followPropTypes = {
  name: PropTypes.string.isRequired
};

const mysteryGiftPropTypes = {
  gifter: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const raidPropTypes = {
  name: PropTypes.string.isRequired
};

const resubPropTypes = {
  name: PropTypes.string.isRequired,
  months: PropTypes.number.isRequired,
  subPlan: PropTypes.string.isRequired
};

const subscriptionPropTypes = {
  name: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const subGiftPropTypes = {
  gifter: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const tipPropTypes = {
  from: PropTypes.string.isRequired,
  formattedAmount: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export const CheerEvent = ({ name, amount }) => (
  <Wrapper>
    <Pomp>
      <Pomps.Resub />
    </Pomp>
    <Header>
      <Actor>{name}</Actor>
      {' cheered '}
      <Modifier>{`${amount} bits!`}</Modifier>
    </Header>
    <Footer>
      <Tags.Cheer />
    </Footer>
  </Wrapper>
);

export const FollowEvent = ({ name }) => (
  <BubbleWrapper>
    <Avatar src={avalonHAPPY} />
    <Bubble>
      Hello there <Actor>{name}</Actor>! Thank you and welcome!
    </Bubble>
  </BubbleWrapper>
);

export const MysteryGiftEvent = ({ gifter, amount, subPlan }) => (
  <Wrapper>
    <Pomp />
    <Header>
      <Actor>{gifter}</Actor>
      {' gifted '}
      <Modifier>{`${amount} ${utils.getTier(
        subPlan
      )} subscriptions!`}</Modifier>
    </Header>
    <Footer>
      <Tags.MysteryGift />
      <Tags.Tier plan={subPlan} />
      <Tags.SPChange plan={subPlan} amount={amount} />
    </Footer>
  </Wrapper>
);

export const RaidEvent = ({ name }) => (
  <Wrapper>
    <Pomp />
    <Header>
      <Actor>{name}</Actor>
      {' thanks for the raid!'}
    </Header>
    <Footer>
      <Tags.Raid />
    </Footer>
  </Wrapper>
);

export const ResubEvent = ({ name, months, subPlan }) => (
  <Wrapper>
    <Pomp>
      <Pomps.Resub />
    </Pomp>
    <Header>
      <Actor>{name}</Actor>
      {' subscribed for '}
      <Modifier>{`${months} consecutive months!`}</Modifier>
    </Header>
    <Footer>
      <Tags.Resub />
      <Tags.Tier plan={subPlan} />
      <Tags.SPRetain />
    </Footer>
  </Wrapper>
);

export const SubscriptionEvent = ({ name, subPlan }) => (
  <Wrapper>
    <Aside />
    <Header>
      <Actor>{name}</Actor>
      {' has just subscribed! '}
    </Header>
    <Footer>
      <Tags.Subscription />
      <Tags.Tier plan={subPlan} />
      <Tags.SPChange plan={subPlan} />
    </Footer>
  </Wrapper>
);

export const SubGiftEvent = ({ gifter, name, subPlan }) => (
  <Wrapper>
    <Aside />
    <Header>
      <Actor>{gifter}</Actor>
      {' gifted '}
      <Actor>{name}</Actor>
      {' a subscription!'}
    </Header>
    <Footer>
      <Tags.SubGift />
      <Tags.Tier plan={subPlan} />
      <Tags.SPChange plan={subPlan} />
    </Footer>
  </Wrapper>
);

export const TipEvent = ({ from, formattedAmount, message }) => (
  <Wrapper>
    <Aside />
    <Header>
      <Actor>{from}</Actor>
      {' just tipped '}
      <Modifier>{formattedAmount}</Modifier>
      {'!'}
      <Message>{message}</Message>
    </Header>
    <Footer>
      <Tags.Tip />
    </Footer>
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
  display: inline-grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  margin-left: 36px;
  width: calc(${props => props.theme.frame.width} * 0.25);

  background: ${props => props.theme.colors.white};
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows[1]};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.inter};
  font-weight: 400;
`;

const Aside = styled.div`
  grid-row: 1;
  align-self: stretch;
  padding: 12px 24px;

  background: ${props => props.theme.colors.gray[5]};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: inset 0 2px 0 2px ${props => props.theme.colors.gray[6]};
`;

const Pomp = styled.div`
  position: relative;
  grid-row: 1;
  align-self: stretch;
  padding: 12px 0;

  background: ${props => props.theme.colors.gray[5]};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: inset 0 2px 0 2px ${props => props.theme.colors.gray[6]};
`;

const Header = styled.div`
  grid-row: 2;
  margin: 0 24px;
  padding: 24px 0;
  color: ${props => props.theme.colors.gray[10]};
  font-size: 20px;
`;

const Message = styled.div`
  margin-top: 12px;
  padding: 12px;

  border-radius: 4px;
  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[22]};
  color: ${props => props.theme.colors.gray[14]};
  font-size: 14px;
  font-style: italic;
`;

const Footer = styled.div`
  grid-row: 3;
  margin: 0 24px;
  padding: 18px 0 24px;

  display: flex;
  align-items: center;
  box-shadow: inset 0 1px 0 ${props => props.theme.colors.gray[20]};
  color: ${props => props.theme.colors.gray[16]};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 14px;
  font-weight: 700;
`;

const Actor = styled.span`
  text-transform: uppercase;
  font-weight: 800;
`;

const Modifier = styled.span`
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Avatar = styled.img`
  transform: rotate(70deg);
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: -4px;
`;

const Bubble = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 10px;
  padding: 18px;

  background-image: linear-gradient(to right, #d0d6dc, #e8ebed);
  box-shadow: inset 0 2px 0 ${props => props.theme.colors.white};
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  color: ${props => props.theme.colors.gray[8]};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 18px;
  font-weight: 400;
  transform: rotate(-1deg);
  transform-origin: bottom left;

  &:before {
    content: '';
    position: absolute;
    left: -11px;
    bottom: 0;

    width: 0;
    height: 0;
    border-bottom: 12px solid #d0d6dc;
    border-left: 12px solid transparent;
  }
`;
