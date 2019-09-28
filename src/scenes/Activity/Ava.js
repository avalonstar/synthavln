import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Frame } from 'styles';

import { Avatar } from 'components';

function Layout() {
  return (
    <Frame.Wrapper>
      <StyledAvatar />
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

const StyledAvatar = styled(Avatar)`
  grid-row: 26;
  align-self: end;
  justify-self: end;
`;

export default Scene;
