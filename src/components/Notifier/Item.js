import React, { Component } from 'react';
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

import styled from 'styled-components';

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

class Item extends Component {
  state = {
    isVisible: false
  };

  componentWillUnmount(nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.timer = setTimeout(() => this.setState({ isVisible: true }));
    }
  }

  handleRest = () => {
    if (!this.state.isVisible) {
      setTimeout(() => this.props.onComplete(), 500);
    }
  };

  render() {
    const { notification } = this.props;
    return !notification ? null : (
      <Wrapper className={this.props.className}>
        {getType(notification)[notification.event]}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  z-index: 1000;
  align-items: end;
`;

export default Item;
