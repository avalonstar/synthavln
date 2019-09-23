import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Frame } from 'styles';

import { Animated } from 'components';

function Layout() {
  return (
    <Frame.Wrapper>
      <StyledAnimated />
    </Frame.Wrapper>
  );
}

function Structure({ children }) {
  return <>{children}</>;
}

function Scene() {
  return (
    <Structure>
      <Layout />
    </Structure>
  );
}

Structure.propTypes = {
  children: PropTypes.node.isRequired
};

const StyledAnimated = styled(Animated)`
  grid-row: 26;
  align-self: end;
  justify-self: end;
`;

export default Scene;
