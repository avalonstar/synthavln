import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

import styled from 'styled-components';

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
      {getType(data)[data.event]}
      <Actor>{data.from || data.name}</Actor>
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
  display: flex;
  align-items: center;
  padding: 10px 14px;

  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  will-change: width, transform, opacity;

  img {
    filter: grayscale(90%);
  }

  :first-child {
    background: ${props => props.theme.colors.gray[0]};
    border-radius: 4px;
    color: ${props => props.theme.colors.white};

    img {
      filter: grayscale(0%);
    }
    svg {
      color: ${props => props.theme.colors.green[0]};
    }
  }

  :not(:first-child) {
    box-shadow: inset -1px 0 0 0 ${props => props.theme.colors.gray[3]};
    color: ${props => props.theme.colors.gray[6]};
  }
`;

const Actor = styled.div`
  padding-left: 4px;
  white-space: nowrap;
  font-weight: 800;
`;

export default Item;
