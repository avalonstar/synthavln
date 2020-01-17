import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import * as Tags from './Events/Tags';
import * as utils from './utils';

const list = {
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
      when: 'beforeChildren',
      staggerChildren: 0.2
    }
  },
  hidden: { opacity: 1 }
};

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -12 }
};

export const CheerEvent = ({ name, count }) => (
  <>
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{name}</Actor>
      <Modifier variants={item}>{`Cheered ${count} bits!`}</Modifier>
    </Header>
    <Footer>
      <Tags.Cheer />
    </Footer>
  </>
);

export const MysteryGiftEvent = ({ name, count, plan }) => (
  <>
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{name}</Actor>
      <Modifier variants={item}>{`${count} ${utils.getTier(
        plan
      )} gift subscriptions!`}</Modifier>
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
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{name}</Actor>
      <Modifier variants={item}>Thanks for the raid!</Modifier>
    </Header>
    <Footer>
      <Tags.Raid />
    </Footer>
  </>
);

export const ResubEvent = ({ name, months, plan }) => (
  <>
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{name}</Actor>
      <Modifier
        variants={item}
      >{`Thanks for ${months} cumulative months!`}</Modifier>
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
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{name}</Actor>
      <Modifier variants={item}>Thanks for the subscription!</Modifier>
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
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{name}</Actor>
      <Modifier variants={item}>{`Enjoy your sub from ${gifter}!`}</Modifier>
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
    <Header initial="hidden" animate="visible" variants={list}>
      <Actor variants={item}>{from}</Actor>
      <Modifier variants={item}>{`Tipped ${formattedcount}!`}</Modifier>
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
  white-space: nowrap;
`;
