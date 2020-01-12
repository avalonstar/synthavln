import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import {
  avalonDEFEND,
  avalonHOLY,
  avalonHUG,
  avalonKANPAI,
  avalonPOG,
  avalonOWO,
  avalonSHUCKS
} from 'components/Emotes';

import Box from './Box';

const getHeader = () => ({
  cheer: 'cheer',
  follow: 'follow',
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
  raid: avalonDEFEND,
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
    opacity: 0,
    transition: {
      when: 'afterChildren'
    }
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
    x: -64,
    transition: {
      when: 'afterChildren'
    }
  }
};

function Pomp({ event }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, [event]);

  return (
    <Container
      animate={isVisible ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, scale: 2, transition: { type: 'spring' } },
        visible: { opacity: 1, scale: 1 }
      }}
    >
      <Box fill duration={2} />
      <Header>{getHeader()[event]}</Header>
      <Emote
        variants={{
          hidden: { x: 776, scale: 1.1 },
          visible: { x: 716, scale: 1.1 }
        }}
        transition={{
          duration: 1,
          type: 'tween',
          ease: 'circOut'
        }}
      >
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
