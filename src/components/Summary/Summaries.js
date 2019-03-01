import React from 'react';
import PropTypes from 'prop-types';
import { config, useSpring, animated } from 'react-spring';

import styled from 'styled-components';

import Daily from './Daily';

function Summaries({ isVisible }) {
  const props = useSpring({
    config: config.stiff,
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    to: [
      {
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : 'translate3d(0, 100%, 0)'
      }
    ]
  });
  return (
    <Wrapper style={props}>
      <Daily />
    </Wrapper>
  );
}

Summaries.propTypes = {
  isVisible: PropTypes.bool
};

Summaries.defaultProps = {
  isVisible: false
};

const Wrapper = styled(animated.div)`
  display: flex;
`;

export default Summaries;
