import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import posed, { PoseGroup } from 'react-pose';

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
      nextProps.notification !== this.props.notification
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
    const { className, notification } = this.props;
    const { isVisible, playStatus } = this.state;
    return !notification ? null : (
      <PoseGroup preEnterPose="from" singleChildOnly>
        {isVisible && (
          <Wrapper className={className}>
            {getType(notification)[notification.event]}
            <Sound
              url={`http://synthform.s3.amazonaws.com/audio/avalonstar/${
                notification.event
              }.ogg`}
              playStatus={playStatus}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              volume={0}
            />
          </Wrapper>
        )}
      </PoseGroup>
    );
  }
}

const wrapperProps = {
  from: { x: '-100%', y: '0%' },
  enter: { x: '0%', y: '0%' },
  exit: { x: '0%', y: '100%' }
};

const Wrapper = styled(posed.div(wrapperProps))`
  z-index: 1000;
  align-items: end;
`;

export default Item;
