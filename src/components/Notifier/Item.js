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
  TipEvent
} from './Events';
import Box from './Events/Box';
import Pomp from './Events/Pomp';
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

function Item({ className, notification }) {
  const [, dispatch] = useNotificationContext();
  const [playStatus, setPlayStatus] = useState(false);
  const [volume] = useState(0.2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayStatus(true);
    }, 600);
    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  function handleError(error) {
    console.error('onError', error); // eslint-disable-line
  }

  function handleFinishedPlaying() {
    setPlayStatus(false);
    return setTimeout(() => {
      dispatch({ type: 'delete' });
    }, 500);
  }

  const baseURL = 'https://synthform.s3.amazonaws.com/audio/avalonstar/';

  return (
    <AnimatePresence exitBeforeEnter>
      {!isEmpty(notification) && (
        <>
          <Content
            className={className}
            initial={{ x: -105, background: 'rgba(13, 10, 18, 0)', opacity: 0 }}
            animate={{ x: 0, background: 'rgba(13, 10, 18, 1)', opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              default: { duration: 1, ease: [0.23, 1, 0.32, 1], type: 'tween' },
              background: { delay: 4 }
            }}
          >
            <Event key={notification.id}>
              <Box delay={2.5} duration={4} />
              <Pomp event={notification.event} />
              <Container
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, type: 'tween' }}
              >
                {getType(notification)[notification.event]}
              </Container>
            </Event>
          </Content>
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
        </>
      )}
      ;
    </AnimatePresence>
  );
}

Item.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    event: PropTypes.string
  }),
  className: PropTypes.string.isRequired,
  soundOnly: PropTypes.bool
};

Item.defaultProps = {
  notification: {},
  soundOnly: false
};

const Event = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  border-radius: 4px;
  overflow: hidden;
`;

const Content = styled(motion.div)`
  width: calc(${props => props.theme.frame.width} * 0.3);
  z-index: 2000;
  align-items: end;
  position: relative;

  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows[1]};
  font-family: ${props => props.theme.fonts.freight};
`;

const Container = styled(motion.div)`
  grid-row: 1;
  grid-column: 1;

  display: grid;
  grid-template-columns: 3fr 1fr;
  overflow: hidden;

  border-radius: 4px;
`;

export default Item;
