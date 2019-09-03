import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import posed from 'react-pose';
import isEmpty from 'lodash/isEmpty';

import { Notifications } from 'providers';

import styled from 'styled-components';

import {
  CheerEvent,
  FollowEvent,
  MysteryGiftEvent,
  SubscriptionEvent,
  SubGiftEvent,
  RaidEvent,
  ResubEvent,
  TipEvent,
  UpgradeEvent
} from './Events';
import { getSongFile } from './utils';

const getType = data => ({
  cheer: CheerEvent({ ...data }),
  follow: FollowEvent({ ...data }),
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  raid: RaidEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data }),
  upgrade: UpgradeEvent({ ...data })
});

function Item({ className, notification, soundOnly }) {
  const [notifications, dispatch] = useContext(Notifications.Context); // eslint-disable-line
  const [isVisible, setIsVisible] = useState(false);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    if (!soundOnly) {
      setVolume(0);
    }
  }, [soundOnly]);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setPlayStatus(true), 600);
  }, [notification]);

  function handleError(error) {
    console.error('onError', error); // eslint-disable-line
  }

  function handleFinishedPlaying() {
    setPlayStatus(false);
    setIsVisible(false);
    return setTimeout(() => dispatch({ type: 'delete' }), 500);
  }

  const baseURL = 'http://synthform.s3.amazonaws.com/audio/avalonstar/';

  return isEmpty(notification) ? null : (
    <Wrapper
      className={className}
      initialPose="hide"
      pose={isVisible ? 'show' : 'hide'}
    >
      {!soundOnly && getType(notification)[notification.event]}
      <ReactPlayer
        url={`${baseURL}${getSongFile(notification)}.ogg`}
        playing={playStatus}
        onEnded={handleFinishedPlaying}
        onError={handleError}
        volume={volume}
        config={{ file: { forceAudio: true } }}
      />
    </Wrapper>
  );
}

Item.propTypes = {
  notification: PropTypes.shape({
    event: PropTypes.string
  }),
  className: PropTypes.string.isRequired,
  soundOnly: PropTypes.bool
};

Item.defaultProps = {
  notification: {},
  soundOnly: false
};

const wrapperProps = {
  hide: { y: '-150%' },
  show: { y: '0%', transition: { ease: 'anticipate', duration: 1000 } }
};

const Wrapper = styled(posed.div(wrapperProps))`
  z-index: 2000;
  align-items: end;
`;

export default Item;
