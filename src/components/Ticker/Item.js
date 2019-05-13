import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import styled from 'styled-components';
import { rgba } from 'polished';

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

function Item({ className, data, style }) {
  return (
    <Wrapper className={className} style={style}>
      <Actor>{data.from || data.name}</Actor>
      <Type>{getType(data)[data.event]}</Type>
    </Wrapper>
  );
}

Item.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    event: PropTypes.string.isRequired
  }).isRequired,
  style: PropTypes.shape({})
};

Item.defaultProps = {
  className: '',
  style: {}
};

const Wrapper = styled(animated.li)`
  padding: 5px 24px 8px;

  box-shadow: 1px 0 0 ${props => rgba(props.theme.colors.muted.purple, 0.12)};
  color: ${props => props.theme.colors.muted.lightbluegrey};
  will-change: width, transform, opacity;

  svg {
    position: relative;
    top: -1px;
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
`;

export default Item;
