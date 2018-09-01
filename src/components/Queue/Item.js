import React from 'react';
import PropTypes from 'prop-types';

import {
  CheerEvent,
  FollowEvent,
  HostEvent,
  MysteryGiftEvent,
  SubscriptionEvent,
  SubGiftEvent,
  RaidEvent,
  ResubEvent,
  TipEvent
} from './Events';

const propTypes = {
  featured: PropTypes.boolean
};

const getType = data => ({
  cheer: CheerEvent({ ...data }),
  follow: FollowEvent({ ...data }),
  host: HostEvent({ ...data }),
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  raid: RaidEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data })
});

const Item = props => {
  const {
    data,
    data: { event, timestamp }
  } = props;
  return (
    <li ref={props.hostRef} style={props.style}>
      {getType(data)[data.event]}
    </li>
  );
};

export default Item;
