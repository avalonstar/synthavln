import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { countBy } from 'lodash';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import EmoteBucketSystem from 'helpers/EmoteBucketSystem';
import { useChatContext, useImageryContext } from 'providers';

import Pose from './Pose';
import { url, path } from './constants';

function Animated({ className }) {
  const { connected, client } = useChatContext();
  const { emotes } = useImageryContext();
  const [emoteCodes, setEmoteCodes] = useState([]);
  const [currentPose, setCurrentPose] = useState('avalonBASE');

  const ebs = new EmoteBucketSystem({
    emoteThreshold: 100,
    trackedEmotes: ['avalonHEHE'],
    onThresholdReached: emote => {
      console.log('onThresholdReached', emote);
      setCurrentPose(emote);
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

  const resetPose = () => {
    setCurrentPose('avalonBASE');
  };

  useEffect(() => {
    const codes = emotes.map(emote => emote.code);
    setEmoteCodes(codes);
  }, [emotes]);

  useEffect(() => {
    if (connected && client) {
      client.onAction((_channel, _user, message) => processEmotes(message));
      client.onPrivmsg((_channel, _user, message) => processEmotes(message));
    }
  }, [connected, client, processEmotes]);

  return (
    <Wrapper
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {currentPose === 'avalonBASE' ? (
        <img src={`${url}${path}/avalonBASE.png`} alt="avalonBASE" />
      ) : (
        <Pose name={currentPose} callback={resetPose} />
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
  img {
    display: block;
  }
`;

export default Animated;
