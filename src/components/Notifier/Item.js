import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import isEmpty from 'lodash/isEmpty';

import { useNotificationContext } from 'providers';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import {
  CheerEvent,
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
  mysterygift: MysteryGiftEvent({ ...data }),
  subscription: SubscriptionEvent({ ...data }),
  subgift: SubGiftEvent({ ...data }),
  raid: RaidEvent({ ...data }),
  resub: ResubEvent({ ...data }),
  tip: TipEvent({ ...data })
});

const variants = {
  initial: { x: '-100%' },
  animate: { x: 0, background: 'rgba(13, 10, 18, 1)', opacity: 1 },
  exit: { scale: 1.1, opacity: 0 }
};

function Item(props) {
  const { className, notification } = props;
  const [, dispatch] = useNotificationContext();
  const [playStatus, setPlayStatus] = useState(false);
  const [volume] = useState(0.2);

  // useAnimation().
  const wrapperControls = useAnimation();
  const boxControls = useAnimation();
  const pompControls = useAnimation();
  const containerControls = useAnimation();

  const delay = t => new Promise(resolve => setTimeout(resolve, t));

  useEffect(() => {
    const sequence = async () => {
      await wrapperControls.start('animate');
      return await Promise.all([
        pompControls.start('hidden'),
        boxControls.start('visible'),
        containerControls.start({
          opacity: 1,
          transition: { type: 'tween' }
        })
      ]);
    };

    if (!isEmpty(notification)) {
      setPlayStatus(true);
      sequence();
    }
  }, [notification]);

  const handleError = error => {
    console.error('onError', error); // eslint-disable-line
  };

  const handleFinishedPlaying = () => {
    setPlayStatus(false);
    return setTimeout(() => {
      dispatch({ type: 'delete' });
    }, 500);
  };

  const baseURL = 'https://synthform.s3.amazonaws.com/audio/avalonstar/';

  return (
    <AnimatePresence exitBeforeEnter>
      {!isEmpty(notification) && (
        <Wrapper
          className={className}
          animate={wrapperControls}
          variants={variants}
          initial="initial"
          exit="exit"
          transition={{
            default: { duration: 1, ease: [0.23, 1, 0.32, 1], type: 'tween' },
            background: { delay: 2 }
          }}
        >
          <Event key={notification.id}>
            <Box controls={boxControls} duration={5} />
            <Pomp controls={pompControls} event={notification.event} />
            <Container initial={{ opacity: 0 }} animate={containerControls}>
              {getType(notification)[notification.event]}
            </Container>
          </Event>
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

const Wrapper = styled(motion.div)`
  width: calc(${props => props.theme.frame.width} * 0.3);
  z-index: 2000;
  align-items: end;
  position: relative;

  background: 'rgba(13, 10, 18, 0)';
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows[1]};
  font-family: ${props => props.theme.fonts.freight};
  opacity: 0;
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
