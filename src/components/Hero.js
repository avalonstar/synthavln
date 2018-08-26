import React from 'react';

import { Indicator, Logo } from './Branding';

import styled from 'styled-components';

const Hero = props => (
  <Wrapper className={props.className}>
    <Indicator />
    <Logo />
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 36px 0;

  background-color: ${props => props.theme.colors.gray[1]};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.montserrat};
`;

export default Hero;
