import React from 'react';

import { Camera } from 'components';

import styled from 'styled-components';
import { Frame } from 'styles';

const Scene = () => (
  <Frame.Wrapper>
    <StyledCamera />
  </Frame.Wrapper>
);

const StyledCamera = styled(Camera)`
  grid-row: 25;
  grid-column: 2;
  justify-self: end;
  align-self: end;
  margin-right: 36px;
  width: 422px;
  z-index: 1000;
`;

export default Scene;
