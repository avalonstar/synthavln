import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { countBy } from 'lodash';

import styled from 'styled-components';
import { motion } from 'framer-motion';

import EmoteBucketSystem from 'helpers/EmoteBucketSystem';
import { useLoaderSystem } from 'helpers/LoaderSystem';
import { useImageryContext } from 'providers';

import Pose from './Pose';
import { baseUrl, url, path } from './constants';
import poses from './poses';

const { tmi } = window;
const { NODE_ENV } = process.env;

const concurency = 10;

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

const animationReducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, isAnimating: true, isCooldown: false };
    case 'stop':
      return { ...state, isAnimating: false, inCooldown: true };
    case 'block':
      return { ...state, blinkBlocked: true };
    case 'unblock':
      return { ...state, blinkBlocked: false };
    case 'reset':
      return { ...state, isAnimating: false, inCooldown: false };
    default:
      return state;
  }
};

function Avatar() {
  const { emotes } = useImageryContext();
  const cooldownTimer = useRef(null);
  const blinkBlockTimer = useRef(null);
  const blinkChecker = useRef(null);
  const [connected, setConnected] = useState(false);
  const [emoteCodes, setEmoteCodes] = useState([]);
  const [poseQueue, dispatchToQueue] = useReducer(reducer, []);
  const [
    { isAnimating, inCooldown, blinkBlocked },
    dispatchToAnimState
  ] = useReducer(animationReducer, {
    isAnimating: false,
    isCooldown: false,
    blinkBlocked: false
  });

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
    emoteThreshold: NODE_ENV === 'production' ? 30 : 5,
    systemCooldown: NODE_ENV === 'production' ? 2 * 60 * 1000 : 1000,
    trackedEmotes: ['avalonFEELS', 'avalonHEHE'],
    onThresholdReached: emote => {
      console.log('onThresholdReached', emote);
      dispatchToQueue({ type: 'add', pose: emote });
    }
  });

  const processEmotes = useCallback(
    message => {
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
    },
    [emoteCodes, ebs]
  );

  const shouldBlink = useCallback(() => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (
      !isAnimating &&
      !inCooldown &&
      !blinkBlocked &&
      poseQueue.length === 0
    ) {
      if (roll % 2 !== 0) {
        dispatchToQueue({ type: 'add', pose: 'avalonBLINK' });
        dispatchToAnimState({ type: 'block' });
        const [min, max] = [1, 6];
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        blinkBlockTimer.current = setTimeout(() => {
          dispatchToAnimState({ type: 'unblock' });
        }, rand * 1000);
      }
    }
  }, [isAnimating, inCooldown, blinkBlocked, poseQueue]);

  useEffect(() => {
    blinkChecker.current = shouldBlink;
  }, [shouldBlink]);

  const resetAnim = useCallback(() => {
    dispatchToAnimState({ type: 'reset' });
  }, []);

  const onPosePlay = () => {
    dispatchToAnimState({ type: 'start' });
  };

  const onPoseComplete = () => {
    dispatchToAnimState({ type: 'stop' });
    dispatchToQueue({ type: 'delete' });
    cooldownTimer.current = setTimeout(() => {
      resetAnim();
    }, 0.4 * 1000); // .4 second animation blocker
  };

  useEffect(() => {
    if (emoteCodes.length > 0 && !connected) {
      client.on('message', (channel, user, message) => processEmotes(message));
      client.connect();
      setConnected(true);
    }
  }, [emoteCodes, connected, client, processEmotes]);

  useEffect(() => {
    const codes = emotes.map(emote => emote.code);
    setEmoteCodes(codes);
  }, [emotes]);

  useEffect(() => {
    const tick = () => {
      if (blinkChecker.current) blinkChecker.current();
    };

    const id = setInterval(tick, 0.6 * 1000); // run interval every .6 seconds
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Wrapper>
      {poseQueue.length === 0 || inCooldown ? (
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

function Container({ className }) {
  const { initialized, loaded, error, resetSystem } = useLoaderSystem({
    baseUrl,
    concurency,
    resourceCollection: poses,
    resourceExt: 'png',
    debug: true
  });

  useEffect(() => {
    if (error) {
      // error handling should go here,
      // then reset the system (probably needs some sort of a limiter/backoff system)
      resetSystem();
    }
  }, [error, resetSystem]);

  return (
    initialized &&
    loaded &&
    !error && (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
      >
        <Avatar />
      </motion.div>
    )
  );
}

Container.propTypes = {
  className: PropTypes.string
};

Container.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  margin-right: -72px;

  img {
    display: block;
  }
`;

export default Container;