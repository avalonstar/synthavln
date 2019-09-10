import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import isEmpty from 'lodash/isEmpty';

import { useNotificationContext } from 'providers';

import { motion, AnimatePresence } from 'framer-motion';
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
  const [, dispatch] = useNotificationContext();
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    if (!soundOnly) {
      setVolume(0);
    }
  }, [soundOnly]);

  useEffect(() => {
    setTimeout(() => setPlayStatus(true), 600);
  }, [notification]);

  function handleError(error) {
    console.error('onError', error); // eslint-disable-line
  }

  function handleFinishedPlaying() {
    setPlayStatus(false);
    return setTimeout(() => dispatch({ type: 'delete' }), 500);
  }

  const baseURL = 'http://synthform.s3.amazonaws.com/audio/avalonstar/';

  return (
    <AnimatePresence>
      {!isEmpty(notification) && (
        <Wrapper
          className={className}
          initial={{ y: '-105%' }}
          animate={{ y: '0' }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], type: 'tween' }}
        >
          {!soundOnly && getType(notification)[notification.event]}
          <ReactPlayer
            url={`${baseURL}${getSongFile(notification)}.ogg`}
            playing={playStatus}
            onEnded={handleFinishedPlaying}
            onError={handleError}
            volume={volume}
            config={{ file: { forceAudio: true } }}
            width="0%"
            height="0%"
          />
        </Wrapper>
      )}
      ;
    </AnimatePresence>
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

const Wrapper = styled(motion.div)`
  z-index: 2000;
  align-items: end;
`;

export default Item;
