import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { Bits, Follow, Gift, Raid, Sub, Tip } from 'components/Icons/Notifier';

import {
  CheerEvent,
  FollowEvent,
  MysteryGiftEvent,
  SubscriptionEvent,
  SubGiftEvent,
  RaidEvent,
  ResubEvent,
  TipEvent,
  UpgradeEvent
} from './Events';

const getType = data => ({
  cheer: CheerEvent({ ...data }),
  follow: FollowEvent({ ...data }),
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  raid: RaidEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data }),
  upgrade: UpgradeEvent({ ...data })
});

const getIcon = () => ({
  cheer: <Bits />,
  follow: <Follow />,
  mysterygift: <Gift />,
  subscription: <Sub />,
  subgift: <Gift />,
  raid: <Raid />,
  resub: <Sub />,
  tip: <Tip />,
  upgrade: <Sub />
});

const spring = {
  type: 'spring',
  damping: 30,
  stiffness: 300
};

function Item({ className, data }) {
  return (
    <Wrapper className={className} layoutTransition={spring}>
      <Icon>{getIcon()[data.event]}</Icon>
      <Actor>
        {data.recipientDisplayName || data.displayName || data.name}
      </Actor>
      <Type>{getType(data)[data.event]}</Type>
    </Wrapper>
  );
}

Item.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    event: PropTypes.string.isRequired,
    recipientDisplayName: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string
  }).isRequired
};

Item.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.li)`
  display: inline-flex;
  position: relative;
  align-items: center;
  margin-left: 12px;
  padding: 0 10px;
  height: 26px;

  background: ${props => props.theme.colors.gradient.darker};
  border-radius: 4px;
  color: ${props => props.theme.colors.white};
`;

const Actor = styled.div`
  padding: 0 10px 0 4px;

  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Type = styled.div`
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

const Icon = styled.div`
  position: relative;
  top: 1px;
`;

export default Item;
