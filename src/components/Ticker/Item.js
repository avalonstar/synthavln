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
  follow: CheerEvent({ ...data }),
  host: HostEvent({ ...data }),
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data })
});

class Item extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }

  render() {
    const {
      data,
      data: { event, timestamp }
    } = this.props;
    const username = data.displayName || data.username;
    return (
      <Wrapper className={this.props.className}>
        {getType(data)[data.event]}
        <Actor>{username}</Actor>
      </Wrapper>
    );
  }
}

const Wrapper = styled.li`
  display: flex;
  padding: 8px 10px;

  font-weight: 800;
  text-transform: uppercase;

  :first-child {
    box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
    border-radius: 4px;
    color: ${props => props.theme.colors.white};

    :before {
      content: '!HYPE';

      color: ${props => props.theme.colors.gray[10]};
      font-family: ${props => props.theme.fonts.barlow};
      font-weight: 800;
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

  img {
    filter: grayscale(90%);
  }
`;

const Actor = styled.div`
  padding-left: 4px;
`;

export default Item;
