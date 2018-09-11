import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import posed from 'react-pose';

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
import { getSongFile } from './utils';

const propTypes = {
  notification: PropTypes.shape({
    event: PropTypes.string
  }),
  className: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  soundOnly: PropTypes.bool
};

const defaultProps = {
  notification: {},
  soundOnly: false
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

class Item extends PureComponent {
  state = {
    isVisible: false,
    playStatus: Sound.status.STOPPED,
    volume: 20
  };

  componentWillReceiveProps(nextProps) {
    const { notification } = this.props;
    if (nextProps.notification && nextProps.notification !== notification) {
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
    const { onComplete } = this.props;
    const { isVisible } = this.state;
    if (!isVisible) {
      setTimeout(() => onComplete(), 500);
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
    const { className, notification, soundOnly } = this.props;
    const { isVisible, playStatus, volume } = this.state;
    const baseURL = 'http://synthform.s3.amazonaws.com/audio/avalonstar/';
    return _.isEmpty(notification) ? null : (
      <Wrapper
        className={className}
        initialPose="hide"
        pose={isVisible ? 'show' : 'hide'}
      >
        {!soundOnly && getType(notification)[notification.event]}
        <Sound
          url={`${baseURL}${getSongFile(notification)}.ogg`}
          playStatus={playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={soundOnly ? volume : 0}
        />
      </Wrapper>
    );
  }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

const wrapperProps = {
  hide: { x: '-100%' },
  show: { x: '0%', transition: { ease: 'anticipate', duration: 1000 } }
};

const Wrapper = styled(posed.div(wrapperProps))`
  z-index: 2000;
  align-items: end;
`;

export default Item;
