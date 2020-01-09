import React from 'react';
import PropTypes from 'prop-types';

import { Debug, Header, Notifier, Toy } from 'components';

import styled from 'styled-components';
import { Frame } from 'styles';

function Layout() {
  return (
    <StyledWrapper>
      <Toy />
      <StyledHeader />
      <StyledNotifier />
      <StyledDebug />
    </StyledWrapper>
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

const StyledWrapper = styled(Frame.Wrapper)`
  grid-template-columns: auto auto 1fr;

  box-shadow: ${props =>
    `inset 0 -160px 100px -100px ${props.theme.colors.muted.dark}`};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 500;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  align-self: start;
  justify-self: center;
  margin-top: 32px;
`;

const StyledHeader = styled(Header)`
  grid-column: 1 / span 3;
  grid-row: 25 / span 2;
  align-self: end;
`;

const StyledDebug = styled(Debug)`
  position: fixed;
  top: 0;
`;

export default Scene;
