import React from 'react';

import { Camera } from 'components';

import styled from 'styled-components';

const Scene = () => <StyledCamera />;

const StyledCamera = styled(Camera)`
  margin: 24px;
  width: 480px;
  z-index: 1000;
`;

export default Scene;
