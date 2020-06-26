import React, { useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

import Box from './Box';

import {
  avalonHOLY,
  avalonHUG,
  avalonKANPAI,
  avalonPOG,
  avalonOWO,
  avalonSHUCKS
} from 'components/Emotes';

const getHeader = () => ({
  cheer: 'cheer',
  mysterygift: 'random subgift',
  subscription: 'subscription',
  subgift: 'subgift',
  raid: 'raid',
  resub: 'resubscription',
  tip: 'tip'
});

const getEmote = () => ({
  cheer: avalonPOG,
  mysterygift: avalonHOLY,
  subscription: avalonHUG,
  subgift: avalonOWO,
  resub: avalonKANPAI,
  tip: avalonSHUCKS
});

const list = {
  visible: {
    opacity: 0.1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  hidden: {
    opacity: 0
  }
};

const item = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  hidden: {
    opacity: 0,
    x: -64
  }
};

function Pomp(props) {
  const { controls, event } = props;

  // useAnimation().
  const boxControls = useAnimation();
  const emoteControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      boxControls.start('visible');
      emoteControls.start({
        x: 716,
        scale: 1.1,
        opacity: 1,
        transition: { duration: 1, type: 'tween', ease: 'circOut' }
      });
    };

    sequence();
  }, [event, boxControls, emoteControls]);

  return (
    <Container
      animate={controls}
      initial="visible"
      variants={{
        hidden: { opacity: 0, scale: 2 },
        visible: { opacity: 1, scale: 1 }
      }}
    >
      <Box controls={boxControls} fill duration={2} />
      <Header>{getHeader()[event]}</Header>
      <Emote animate={emoteControls}>
        <img src={getEmote()[event]} alt="" />
      </Emote>
      <Pattern initial="hidden" animate="visible" variants={list}>
        {[...Array(5)].map((e, x) => (
          <Text key={x} variants={item}>
            {[...Array(6)].map((e, i) => (
              <motion.div key={`${x}-${i}`} variants={item}>
                {event}
              </motion.div>
            ))}
          </Text>
        ))}
      </Pattern>
    </Container>
  );
}

const Container = styled(motion.div)`
  grid-row: 1;
  grid-column: 1;
  display: flex;
  align-items: center;
  align-content: center;

  position: relative;
  border-radius: 4px;
  z-index: 1000;
  overflow: hidden;

  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
`;

const Header = styled(motion.div)`
  padding-left: 24px;

  color: ${props => props.theme.colors.white};
  font-size: 30px;
  z-index: 3000;

  &:after {
    content: '.';
    color: ${props => props.theme.colors.main.avagreen};
  }
`;

const Emote = styled(motion.div)`
  position: absolute;
  left: -256px;
  z-index: 3000;
  opacity: 0;
`;

const Pattern = styled(motion.div)`
  position: absolute;
  top: -18px;
  left: -25%;
  width: 100vw;

  line-height: 28px;

  > div:nth-child(2n) {
    position: relative;
    left: 24px;
  }
`;

const Text = styled(motion.div)`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.freight};
  font-size: 30px;

  div {
    display: inline-block;
    padding: 0 2px;
  }
`;

export default Pomp;
