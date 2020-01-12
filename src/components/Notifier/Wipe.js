import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toPath from 'element-to-path';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import Box from './Events/Box';

import avalonDANCE from 'components/Emotes/assets/avalonDANCE.png';
import avalonDEFEND from 'components/Emotes/assets/avalonDEFEND.png';
import avalonHUG from 'components/Emotes/assets/avalonHUG.png';
import avalonKANPAI from 'components/Emotes/assets/avalonKANPAI.png';
import avalonOWO from 'components/Emotes/assets/avalonOWO.png';
import avalonPOG from 'components/Emotes/assets/avalonPOG.png';
import avalonSHUCKS from 'components/Emotes/assets/avalonSHUCKS.png';

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
  cheer: avalonDANCE,
  mysterygift: avalonPOG,
  subscription: avalonHUG,
  subgift: avalonOWO,
  raid: avalonDEFEND,
  resub: avalonKANPAI,
  tip: avalonSHUCKS
});

function Wipe({ event }) {
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
      <Pattern>
        {[...Array(5)].map((e, x) => (
          <Text key={x}>
            {[...Array(8)].map((e, i) => (
              <div key={i}>{event}</div>
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
`

const SVG = styled(motion.svg)`
  position: absolute;
  top: 0;
  left: 0;
`

const Path = styled(motion.path)`
  stroke: ${props => props.theme.colors.main.avapurple};
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: 4;
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
`

const Pattern = styled(motion.div)`
  position: absolute;
  top: -18px;
  left: -25%;
  width: calc(100% * 2);

  line-height: 28px;

  > div:nth-child(2n) { position: relative; left: 24px; }
`

const Text = styled(motion.div)`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.freight};
  font-size: 30px;
  opacity: 0.075;

  div { display: inline-block; padding: 0 2px; }
`

export default Wipe;


