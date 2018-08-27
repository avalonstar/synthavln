import React from 'react';

import Indicator from './Indicator';

import styled from 'styled-components';
import logo from './logo.png';

const Logo = props => (
  <Wrapper>
    <StyledIndicator />
    <Avocado src={logo} />
    Avalonstar
    <Period>.</Period>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-right: 36px;

  color: ${props => props.theme.colors.white};
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
`;

const Avocado = styled.img`
  width: 28px;
  height: 28px;

  margin-right: 8px;
`;

const Period = styled.span`
  color: ${props => props.theme.colors.green[0]};
`;

const StyledIndicator = styled(Indicator)`
  left: -36px;
`;

export default Logo;
