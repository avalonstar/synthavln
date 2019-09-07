import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import styled from 'styled-components';

import Item from './Item';

function Ticker({ events, className }) {
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

Ticker.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  isVisible: PropTypes.bool
};

Ticker.defaultProps = {
  events: [],
  isVisible: false
};

const Wrapper = styled(motion.ol)`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0;
  padding: 0;

  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  background: ${props => props.theme.colors.muted.dark};
  list-style: none;
  box-shadow: ${props => props.theme.shadows[2]};
`;

export default Ticker;
