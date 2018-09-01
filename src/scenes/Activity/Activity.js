import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import {
  Camera,
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
  <UIContext.Consumer>
    {uiState => (
      <Fragment>
        <StyledCamera />
        <Providers.Events>
          {(state, notifications, onComplete) => (
            <Fragment>
              <StyledHero>
                <Logotype />
                <Ticker
                  whitelistedEvents={uiState.whitelistedEvents}
                  events={state.data}
                />
                <Summary />
              </StyledHero>
              <StyledNotifier
                whitelistedEvents={uiState.whitelistedEvents}
                notifications={notifications}
                onComplete={onComplete}
              />
              <StyledQueue notifications={notifications} />
            </Fragment>
          )}
        </Providers.Events>
      </Fragment>
    )}
  </UIContext.Consumer>
);

const Activity = props => (
  <Fragment>
    <StyledLogomark />
    <Frame.OuterBorder />
    <Frame.Wrapper>
      <Layout />
    </Frame.Wrapper>
    <Frame.InnerBorder />
  </Fragment>
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

const StyledCamera = styled(Camera)`
  display: none;
  grid-row: 25;
  grid-column: 2;
  justify-self: end;
  align-self: end;
  margin-right: 36px;
  width: 422px;
  z-index: 1000;
`;

export default Activity;
