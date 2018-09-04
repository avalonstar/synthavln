import React from 'react';
import PropTypes from 'prop-types';

import {
  CheerEvent,
  FollowEvent,
  MysteryGiftEvent,
  SubscriptionEvent,
  SubGiftEvent,
  RaidEvent,
  ResubEvent,
  TipEvent
} from './Events';

const propTypes = {
  hostRef: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  data: PropTypes.shape({
    event: PropTypes.string.isRequired,
    timestamp: PropTypes.object // eslint-disable-line
  }).isRequired
};

const defaultProps = {
  style: {}
};

const getType = data => ({
  cheer: CheerEvent({ ...data }),
  follow: FollowEvent({ ...data }),
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  raid: RaidEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data })
});

const Item = ({ data, hostRef, style }) => (
  <li ref={hostRef} style={style}>
    {getType(data)[data.event]}
  </li>
);

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
