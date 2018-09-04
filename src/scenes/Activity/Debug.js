import React, { Fragment } from 'react';

import { Logotype, Hero, Notifier, Queue, Summary, Ticker } from 'components';
import * as Providers from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

const Layout = props => (
  <Fragment>
    <StyledHero>
      <Logotype isVisible />
      <Ticker events={props.state.data} isVisible />
      <Summary isVisible />
    </StyledHero>
    <StyledNotifier
      notifications={props.notifications}
      onComplete={props.onComplete}
    />
    <StyledQueue notifications={props.notifications} />
  </Fragment>
);

const Structure = props => (
  <Fragment>
    <Frame.OuterBorder />
    <Frame.Wrapper>{props.children}</Frame.Wrapper>
    <Frame.InnerBorder />
  </Fragment>
);

const Scene = props => (
  <Providers.Events>
    {props => (
      <Structure>
        <Layout {...props} />
      </Structure>
    )}
  </Providers.Events>
);

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
