import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import styled from 'styled-components';

import Daily from './Daily';
import Total from './Total';

function Summaries({ className, isVisible }) {
  const props = useSpring({
    delay: 400,
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    to: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)'
    }
  });
  return (
    <Wrapper className={className} style={props}>
      <Total />
      <Daily />
    </Wrapper>
  );
}

Summaries.propTypes = {
  className: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

Summaries.defaultProps = {
  isVisible: false
};

const Wrapper = styled(animated.div)`
  display: flex;
`;

export default Summaries;
