import React from 'react';
import PropTypes from 'prop-types';
import { config, useSpring, animated } from 'react-spring';

import styled from 'styled-components';

import Logotype from './Logotype';

import logo from './assets/logo.png';

function Logo({ className, isVisible }) {
  const props = useSpring({
    config: config.stiff,
    delay: 600,
    from: { transform: 'translate3d(-200%, 0, 0)' },
    to: {
      transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-200%, 0, 0)'
    }
  });
  return (
    <Wrapper className={className}>
      <Avocado src={logo} style={props} />
      <Logotype />
    </Wrapper>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

Logo.defaultProps = {
  isVisible: false
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 24px;

  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.gotham};
`;

const Avocado = styled(animated.img)`
  margin-right: 6px;
  width: 28px;
  height: 28px;
  will-change: transform;
`;

export default Logo;
