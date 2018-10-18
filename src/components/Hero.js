import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  className: ''
};

const Hero = ({ className, children }) => (
  <Wrapper className={className}>{children}</Wrapper>
);

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

const Wrapper = styled.div`
  display: grid;
  width: calc(${props => props.theme.frame.width} - 36px * 2);
  grid-template-columns: auto 1fr auto;

  align-items: center;
  padding: 12px 36px 0;

  background-color: ${props => props.theme.colors.gray[2]};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.inter};
  font-weight: 500;
`;

export default Hero;
