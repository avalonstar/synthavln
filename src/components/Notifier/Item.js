import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

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
    isVisible: false,
    playStatus: Sound.status.STOPPED
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.notification &&
      nextProps.notification === this.props.notification
    ) {
      this.timer = setTimeout(() =>
        this.setState({
          isVisible: true,
          playStatus: Sound.status.PLAYING
        })
      );
    }
  }

  handleRest = () => {
    if (!this.state.isVisible) {
      setTimeout(() => this.props.onComplete(), 500);
    }
  };

  handleSongFinishedPlaying = () => {
    this.setState({
      isVisible: false,
      playStatus: Sound.status.STOPPED
    });
    clearTimeout(this.timer);
    this.handleRest();
  };

  render() {
    const { notification } = this.props;
    return !notification ? null : (
      <Wrapper className={this.props.className}>
        {getType(notification)[notification.event]}
        <Sound
          url={`http://synthform.s3.amazonaws.com/audio/avalonstar/${
            notification.event
          }.ogg`}
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={20}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  z-index: 1000;
  align-items: end;
`;

export default Item;
