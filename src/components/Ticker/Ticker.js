import React from 'react';
import { motion } from 'framer-motion';

import { useEventContext } from 'providers';

import styled from 'styled-components';

import Item from './Item';

function Ticker({ className }) {
  const { events } = useEventContext();

  return (
    events && (
      <Wrapper className={className}>
        {events.map(event => (
          <Item key={event.timestamp} data={event} />
        ))}
      </Wrapper>
    )
  );
}

const Wrapper = styled(motion.ol)`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0;
  padding: 0;

  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  list-style: none;
`;

export default Ticker;
