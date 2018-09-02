import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import {
  Logomark,
  Logotype,
  Hero,
  Notifier,
  Queue,
  Summary,
  Ticker
} from 'components';
import { UIContext } from 'contexts';
import * as Providers from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

const Layout = () => (
  <Providers.Events>
    {(state, notifications, onComplete) => (
      <Fragment>
        <StyledHero>
          <Logotype />
          <Ticker events={state.data} />
          <Summary />
        </StyledHero>
        <StyledNotifier notifications={notifications} onComplete={onComplete} />
        <StyledQueue notifications={notifications} />
      </Fragment>
    )}
  </Providers.Events>
);

const Structure = props => (
  <Fragment>
    <Frame.OuterBorder />
    <Frame.Wrapper>{props.children}</Frame.Wrapper>
    <Frame.InnerBorder />
  </Fragment>
);

const Scene = props => (
  <Structure>
    <Layout />
  </Structure>
);

const StyledLogomark = styled(Logomark)`
  display: none;
  top: 28px;
`;

const StyledHero = styled(Hero)`
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  box-shadow: ${props => props.theme.shadows[3]};
`;

const StyledNotifier = styled(Notifier)`
  grid-row: 23 / span 2;
  align-self: end;
`;

const StyledQueue = styled(Queue)`
  grid-column: 1 / span 2;
  grid-row: 25 / span 2;
  align-self: end;
`;

export default Scene;
