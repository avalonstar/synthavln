import React from 'react';

import styled from 'styled-components';
import { rgba } from 'polished';

export const Resub = () => <Wrapper />;

export const Subscription = () => <Wrapper />;

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 192px;
  overflow: hidden;

  /* background-color: ${rgba('#ff0000', 0.2)}; */
`;
