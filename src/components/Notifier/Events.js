import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as Tags from './Events/Tags';
import * as utils from './utils';

import avalonHAPPY from './assets/avalonHAPPY.png';

const cheerPropTypes = {
  amount: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired
};

const followPropTypes = {
  name: PropTypes.string.isRequired
};

const mysteryGiftPropTypes = {
  displayName: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const raidPropTypes = {
  displayName: PropTypes.string.isRequired
};

const resubPropTypes = {
  displayName: PropTypes.string.isRequired,
  cumulativeMonths: PropTypes.number.isRequired,
  subPlan: PropTypes.string.isRequired
};

const subscriptionPropTypes = {
  name: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const subGiftPropTypes = {
  displayName: PropTypes.string.isRequired,
  recipientDisplayName: PropTypes.string.isRequired,
  subPlan: PropTypes.string.isRequired
};

const tipPropTypes = {
  from: PropTypes.string.isRequired,
  formattedAmount: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

const upgradePropTypes = {
  displayName: PropTypes.string.isRequired
};

export const CheerEvent = ({ displayName, amount }) => (
  <Wrapper>
    <Header>
      <Actor>{displayName}</Actor>
      <Modifier>{`cheered ${amount} bits!`}</Modifier>
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

export const MysteryGiftEvent = ({ displayName, amount, subPlan }) => (
  <Wrapper>
    <Header>
      <Actor>{displayName}</Actor>
      <Modifier>{`gifted ${amount} ${utils.getTier(
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

export const RaidEvent = ({ displayName }) => (
  <Wrapper>
    <Header>
      <Actor>{displayName}</Actor>
      <Modifier>Thanks for the raid!</Modifier>
    </Header>
    <Footer>
      <Tags.Raid />
    </Footer>
  </Wrapper>
);

export const ResubEvent = ({ displayName, cumulativeMonths, subPlan }) => (
  <Wrapper>
    <Header>
      <Actor>{displayName}</Actor>
      <Modifier>{`${cumulativeMonths} consecutive months!`}</Modifier>
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
    <Header>
      <Actor>{name}</Actor>
      <Modifier>has just subscribed!</Modifier>
    </Header>
    <Footer>
      <Tags.Subscription />
      <Tags.Tier plan={subPlan} />
      <Tags.SPChange plan={subPlan} />
    </Footer>
  </Wrapper>
);

export const SubGiftEvent = ({
  displayName,
  recipientDisplayName,
  subPlan
}) => (
  <Wrapper>
    <Header>
      <Actor>{displayName}</Actor>
      <Modifier>{`gifted ${recipientDisplayName} a subscription!`}</Modifier>
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
    <Header>
      <Actor>{from}</Actor>
      <Modifier>{`just tipped ${formattedAmount}!`}</Modifier>
      <Message>{message}</Message>
    </Header>
    <Footer>
      <Tags.Tip />
    </Footer>
  </Wrapper>
);

export const UpgradeEvent = ({ displayName }) => (
  <Wrapper>
    <Header>
      <Actor>{displayName}</Actor>
      <Modifier>just upgraded their gift sub!</Modifier>
    </Header>
    <Footer>
      <Tags.Upgrade />
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
UpgradeEvent.propTypes = upgradePropTypes;

const Wrapper = styled.div`
  display: inline-grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  min-width: calc(${props => props.theme.frame.width} * 0.15);

  background: ${props => props.theme.colors.white};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  box-shadow: ${props => props.theme.shadows[1]};
  font-family: ${props => props.theme.fonts.freight};
`;

const Header = styled.div`
  grid-row: 1;
  margin: 0 24px;
  padding: 24px 0;

  color: ${props => props.theme.colors.muted.midgrey};
  font-weight: 600;
  text-transform: uppercase;
`;

const Message = styled.div`
  margin-top: 12px;
  padding: 12px;

  border-radius: 4px;
  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.muted.midgrey};
  color: ${props => props.theme.colors.muted.midgrey};
  font-size: 14px;
  font-style: italic;
`;

const Footer = styled.div`
  grid-row: 2;
  display: flex;
  align-items: center;
  padding: 12px 24px;

  background-color: ${props => props.theme.colors.main.dark};
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 12px;
`;

const Actor = styled.div`
  color: ${props => props.theme.colors.main.dark};
  font-size: 20px;
  font-weight: 800;
`;

const Modifier = styled.div`
  color: ${props => props.theme.colors.muted.midgrey};
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Avatar = styled.img`
  transform: rotate(180deg);
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 10000;
`;

const Bubble = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 10px;
  padding: 18px;

  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.main.dark},
    ${props => props.theme.colors.muted.dark}
  );
  box-shadow: inset 0 2px 0 ${props => props.theme.colors.main.dark};
  border-radius: 8px;
  border-bottom-left-radius: 0px;
  color: ${props => props.theme.colors.muted.lightbluegrey};
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 18px;
  font-weight: 400;
  transform: rotate(-1deg);
  transform-origin: bottom left;
  white-space: nowrap;

  ${Actor} {
    display: inline;
    color: ${props => props.theme.colors.main.avapurple};
  }

  &:before {
    content: '';
    position: absolute;
    left: -11px;
    bottom: 0;

    width: 0;
    height: 0;
    border-bottom: 12px solid ${props => props.theme.colors.main.dark};
    border-left: 12px solid transparent;
  }
`;
