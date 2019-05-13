import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import styled from 'styled-components';

function Hero({ className, isVisible, children }) {
  const { y } = useSpring({
    config: { mass: 5, tension: 500, friction: 60 },
    y: isVisible ? 0 : 100
  });
  return (
    <Wrapper
      className={className}
      style={{ transform: y.interpolate(y => `translate3d(0, ${y}%, 0)`) }}
    >
      {children}
    </Wrapper>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Hero.defaultProps = {
  className: '',
  isVisible: false
};

const Wrapper = styled(animated.div)`
  display: grid;
  width: calc(${props => props.theme.frame.width} - 36px * 2);
  grid-template-columns: auto auto 1fr;

  align-items: center;
  padding: 0 36px 12px;

  background-color: ${props => props.theme.colors.main.dark};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 500;
`;

export default Hero;
