import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { countBy } from 'lodash';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import EmoteBucketSystem from 'helpers/EmoteBucketSystem';
import { useImageryContext } from 'providers';

import Pose from './Pose';
import { url, path } from './constants';

const { tmi } = window;
const { NODE_ENV } = process.env;

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.pose];
    case 'delete':
      return [...state.slice(1)];
    default:
      throw new Error('Unexpected action.');
  }
};

function Animated({ className }) {
  const { emotes } = useImageryContext();
  const [emoteCodes, setEmoteCodes] = useState([]);
  const [isAnimating, setAnimating] = useState(false);
  const [poseQueue, dispatchToQueue] = useReducer(reducer, []);

  // eslint-disable-next-line new-cap
  const client = new tmi.client({
    options: {
      debug: NODE_ENV !== 'production'
    },
    connection: {
      reconnect: true,
      secure: true
    },
    channels: ['#avalonstar']
  });

  const ebs = new EmoteBucketSystem({
    emoteThreshold: 5,
    systemCooldown: 1000,
    trackedEmotes: ['avalonHEHE'],
    onThresholdReached: emote => {
      console.log('onThresholdReached', emote);
      if (!isAnimating) dispatchToQueue({ type: 'add', pose: emote });
    }
  });

  const processEmotes = message => {
    const occurances = countBy(message.split(' '), token => token);
    const filtered = Object.keys(occurances)
      .filter(key => emoteCodes.includes(key))
      .reduce((obj, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = occurances[key];
        return obj;
      }, {});
    return Object.keys(filtered).forEach(key => {
      ebs.processIncomgingEmote(key, occurances[key]);
    });
  };

  const setupTMI = () => {
    client.on('message', (channel, user, message) => processEmotes(message));
    client.connect();
  };

  const blink = () => {
    const [min, max] = [3, 9];
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(
      () => dispatchToQueue({ type: 'add', pose: 'avalonBLINK0' }),
      rand * 1000
    );
  };

  const onPosePlay = () => {
    setAnimating(true);
  };

  const onPoseComplete = () => {
    setAnimating(false);
    dispatchToQueue({ type: 'delete' });
  };

  useEffect(() => {
    if (emoteCodes.length > 0) setupTMI();
  }, [emoteCodes]);

  useEffect(() => {
    console.log('Pose Queue:', poseQueue);
  }, [poseQueue]);

  useEffect(() => {
    if (poseQueue.length === 0) {
      blink();
    }
  }, [poseQueue]);

  useEffect(() => {
    const codes = emotes.map(emote => emote.code);
    setEmoteCodes(codes);
  }, [emotes]);

  return (
    <Wrapper
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {poseQueue.length === 0 ? (
        <img src={`${url}${path}/avalonBASE.png`} alt="avalonBASE" />
      ) : (
        <Pose
          name={poseQueue[0]}
          onPlay={onPosePlay}
          onComplete={onPoseComplete}
        />
      )}
    </Wrapper>
  );
}

Animated.propTypes = {
  className: PropTypes.string
};

Animated.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  margin-right: -60px;

  img {
    display: block;
  }
`;

export default Animated;
