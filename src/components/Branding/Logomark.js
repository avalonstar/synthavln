import React from 'react';

import Indicator from './Indicator';

import styled from 'styled-components';
import logo from './logo.png';

const Logomark = props => (
  <Wrapper className={props.className}>
    <StyledIndicator />
    <Avocado src={logo} />
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 2000;
`;

const StyledIndicator = styled(Indicator)``;

const Avocado = styled.img`
  margin-left: 12px;
  width: 28px;
  height: 28px;
`;

export default Logomark;
