import React, { PureComponent } from 'react';
import Sound from 'react-sound';
import posed from 'react-pose';

import { getSongFile } from './utils';

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

class Item extends PureComponent {
  state = {
    isVisible: false,
    playStatus: Sound.status.STOPPED,
    volume: 20
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.notification &&
      nextProps.notification !== this.props.notification
    ) {
      this.timer = setTimeout(() => {
        this.setState({ isVisible: true });
        setTimeout(
          () => this.setState({ playStatus: Sound.status.PLAYING }),
          600
        );
      });
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
    const baseURL = 'http://synthform.s3.amazonaws.com/audio/avalonstar/';
    return !notification ? null : (
      <Wrapper
        className={this.props.className}
        pose={this.state.isVisible ? 'show' : 'hide'}
      >
        {!this.props.soundOnly && getType(notification)[notification.event]}
        <Sound
          url={`${baseURL}${getSongFile(notification)}.ogg`}
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={this.props.soundOnly ? this.state.volume : 0}
        />
      </Wrapper>
    );
  }
}

const wrapperProps = {
  hide: { x: '-100%' },
  show: { x: '0%', transition: { ease: 'anticipate', duration: 1000 } }
};

const Wrapper = styled(posed.div(wrapperProps))`
  z-index: 2000;
  align-items: end;
`;

export default Item;
