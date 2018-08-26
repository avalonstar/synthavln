import React from 'react';

import styled from 'styled-components';
import logo from './logo.png';

const Logo = props => (
  <Wrapper>
    <Avocado src={logo} />
    Avalonstar
    <Period>.</Period>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;

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

export default Logo;
