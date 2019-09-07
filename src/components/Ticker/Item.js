import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import styled from 'styled-components';
import { rgba } from 'polished';

import { Bits, Follow, Gift, Raid, Sub, Tip } from 'components/Icons/Ticker';

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

function Item({ className, data, style }) {
  return (
    <Wrapper className={className} style={style}>
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
  }).isRequired,
  style: PropTypes.shape({})
};

Item.defaultProps = {
  className: '',
  style: {}
};

const Wrapper = styled(motion.li)`
  display: inline-flex;
  align-items: center;
  padding: 10px 24px 12px 24px;

  box-shadow: 1px 0 0 ${props => rgba(props.theme.colors.muted.purple, 0.15)};
  color: ${props => props.theme.colors.muted.lightbluegrey};
  will-change: width, transform, opacity;

  svg {
    transform: rotate(-30deg) scale(2);
    opacity: 0.2;
  }
`;

const Actor = styled.div`
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
  padding-left: 12px;
`;

const Icon = styled.div`
  position: absolute;
  left: 24px;
  top: calc(50% - 11px);
`;

export default Item;
