import React from 'react';

import { Logotype } from './Branding';
import { Ticker } from './Ticker';
import Summary from './Summary';

import events from 'helpers/events';

import styled from 'styled-components';

const Hero = props => (
  <Wrapper className={props.className}>
    <Logotype />
    <Ticker events={events} />
    <Summary />
  </Wrapper>
);

const Wrapper = styled.div`
  display: grid;
  width: calc(${props => props.theme.frame.width} - 36px * 2);
  grid-template-columns: auto auto 1fr auto;

  align-items: center;
  padding: 12px 36px 0;

  background-color: ${props => props.theme.colors.gray[2]};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.gotham};
  font-weight: 500;
`;

export default Hero;
