import React, { Component } from 'react';

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

import styled from 'styled-components';
import { rgba } from 'polished';

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

class Item extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }

  render() {
    const { className, data } = this.props;
    return (
      <Wrapper className={className}>
        {getType(data)[data.event]}
        <Actor>{data.name}</Actor>
      </Wrapper>
    );
  }
}

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 10px;

  font-weight: 800;
  font-size: 14px;
  text-transform: uppercase;

  img {
    filter: grayscale(90%);
  }

  :first-child {
    box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
    border-radius: 4px;
    color: ${props => props.theme.colors.white};

    :before {
      position: relative;
      top: -1px;
      content: '!HYPE';

      color: ${props => props.theme.colors.gray[10]};
      font-family: ${props => props.theme.fonts.din};
      font-weight: 600;
      padding-right: 12px;
    }

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
`;

export default Item;
