import React from 'react';
import PropTypes from 'prop-types';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import * as Tags from './Events/Tags';
import * as utils from './utils';

import avalonHAPPY from './assets/avalonHAPPY.png';

export const CheerEvent = ({ name, count }) => (
  <>
    <Header>
      <Actor>{name}</Actor>
      <Modifier>{`cheered ${count} bits!`}</Modifier>
    </Header>
    <Footer>
      <Tags.Cheer />
    </Footer>
  </>
);

export const FollowEvent = ({ name }) => (
  <BubbleWrapper>
    <Avatar src={avalonHAPPY} />
    <Bubble>
      Hello there <Actor>{name}</Actor>! Thank you and welcome!
    </Bubble>
  </BubbleWrapper>
);

export const MysteryGiftEvent = ({ name, count, plan }) => (
  <>
    <Header>
      <Actor>{name}</Actor>
      <Modifier>{`gifted ${count} ${utils.getTier(
        plan
      )} subscriptions!`}</Modifier>
    </Header>
    <Footer>
      <Tags.MysteryGift />
      <Tags.Tier plan={plan} />
      <Tags.SPChange plan={plan} count={count} />
    </Footer>
  </>
);

export const RaidEvent = ({ name }) => (
  <>
    <Header>
      <Actor>{name}</Actor>
      <Modifier>Thanks for the raid!</Modifier>
    </Header>
    <Footer>
      <Tags.Raid />
    </Footer>
  </>
);

export const ResubEvent = ({ event, name, months, plan }) => (
  <>
    <Header>
      <Actor>{name}</Actor>
      <Modifier>{`${months} cumulative months!`}</Modifier>
    </Header>
    <Footer>
      <Tags.Resub />
      <Tags.Tier plan={plan} />
      <Tags.SPRetain />
    </Footer>
  </>
);

export const SubscriptionEvent = ({ name, plan }) => (
  <>
    <Header>
      <Actor>{name}</Actor>
      <Modifier>has just subscribed!</Modifier>
    </Header>
    <Footer>
      <Tags.Subscription />
      <Tags.Tier plan={plan} />
      <Tags.SPChange plan={plan} />
    </Footer>
  </>
);

export const SubGiftEvent = ({ name, gifter, plan }) => (
  <>
    <Header>
      <Actor>{name}</Actor>
      <Modifier>{`was gifted a subscription by ${gifter}!`}</Modifier>
    </Header>
    <Footer>
      <Tags.SubGift />
      <Tags.Tier plan={plan} />
      <Tags.SPChange plan={plan} />
    </Footer>
  </>
);

export const TipEvent = ({ from, formattedcount }) => (
  <>
    <Header>
      <Actor>{from}</Actor>
      <Modifier>{`just tipped ${formattedcount}!`}</Modifier>
    </Header>
    <Footer>
      <Tags.Tip />
    </Footer>
  </>
);  

CheerEvent.propTypes = {
  count: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

FollowEvent.propTypes = {
  name: PropTypes.string.isRequired
};

MysteryGiftEvent.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired
};

RaidEvent.propTypes = {
  name: PropTypes.string.isRequired
};

ResubEvent.propTypes = {
  name: PropTypes.string.isRequired,
  months: PropTypes.number.isRequired,
  plan: PropTypes.string.isRequired
};

SubscriptionEvent.propTypes = {
  name: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired
};

SubGiftEvent.propTypes = {
  name: PropTypes.string.isRequired,
  gifter: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired
};

TipEvent.propTypes = {
  from: PropTypes.string.isRequired,
  formattedcount: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

const Header = styled(motion.div)`
  grid-column: 1;
  padding: 22px 42px 28px 30px;

  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.colors.main.dark},
    ${props => props.theme.colors.muted.dark}
  );
  color: ${props => props.theme.colors.muted.midgrey};
  font-weight: 600;
`;

const Footer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px 24px;

  /* box-shadow: inset 2px 0 0 ${props => props.theme.colors.main.avapurple}; */
  background-color: ${props => props.theme.colors.main.dark};
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 12px;
  font-weight: 700;
`;

const Actor = styled(motion.div)`
  color: ${props => props.theme.colors.white};
  font-size: 30px;
  font-weight: 800;

  &:after {
    content: '.';
    color: ${props => props.theme.colors.main.avagreen};
  }
`;

const Modifier = styled(motion.div)`
  color: ${props => props.theme.colors.muted.lightbluegrey};
  font-family: ${props => props.theme.fonts.adelle};
  font-style: italic;
  font-feature-settings: 'lnum';
  font-size: 18px;
  font-variant-numeric: lining-nums;
  font-weight: 600;
  text-transform: capitalize;
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
