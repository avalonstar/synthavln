import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import Logotype from './Logotype';

import logo from './assets/logo.png';

function Logo({ className, isVisible }) {
  return (
    <Wrapper className={className}>
      <Avocado src={logo} />
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

const Avocado = styled(motion.img)`
  margin-right: 6px;
  width: 28px;
  height: 28px;
  will-change: transform;
`;

export default Logo;
