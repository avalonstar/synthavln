import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
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
  TipEvent
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
  tip: TipEvent({ ...data })
});

function Item({ className, notification, soundOnly }) {
  const [notifications, dispatch] = useContext(Notifications.Context); // eslint-disable-line
  const [isVisible, setIsVisible] = useState(false);
  const [playStatus, setPlayStatus] = useState('STOPPED');
  const [volume, setVolume] = useState(20);

  useEffect(() => {
    if (!soundOnly) {
      setVolume(0);
    }
  }, [soundOnly]);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setPlayStatus('PLAYING'), 600);
  }, [notification]);

  function handleFinishedPlaying() {
    setPlayStatus('STOPPED');
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
      <Sound
        url={`${baseURL}${getSongFile(notification)}.ogg`}
        playStatus={playStatus}
        onFinishedPlaying={handleFinishedPlaying}
        volume={volume}
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
  hide: { x: '-100%' },
  show: { x: '0%', transition: { ease: 'anticipate', duration: 1000 } }
};

const Wrapper = styled(posed.div(wrapperProps))`
  z-index: 2000;
  align-items: end;
`;

export default Item;
