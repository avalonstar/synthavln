import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Ava,
  Logotype,
  Hero,
  Notifier,
  Queue,
  Summaries,
  Ticker
} from 'components';
import { Events, Notifications, UI } from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

function NotificationsArea() {
  const [notifications] = useContext(Notifications.Context);
  return (
    <Frame.Wrapper>
      <StyledNotifier notifications={notifications} />
      <StyledQueue notifications={notifications} />
    </Frame.Wrapper>
  );
}

function TickerArea({ isVisible }) {
  const { events } = useContext(Events.Context);
  return (
    <Frame.Wrapper>
      <StyledHero isVisible={isVisible}>
        <Logotype isVisible={isVisible} />
        <Summaries isVisible={isVisible} />
        <Ticker events={events} isVisible={isVisible} />
      </StyledHero>
    </Frame.Wrapper>
  );
}

function Layout() {
  return (
    <Fragment>
      <TickerArea isVisible />
      <NotificationsArea />
    </Fragment>
  );
}

function Structure({ children }) {
  const { mode } = useContext(UI.Context);
  return (
    <Fragment>
      <Ava version={mode} />
      <Frame.OuterBorder />
      {children}
      <Frame.InnerBorder />
    </Fragment>
  );
}

function Scene() {
  return (
    <Notifications.Provider>
      <Events.Provider>
        <Structure>
          <Layout />
        </Structure>
      </Events.Provider>
    </Notifications.Provider>
  );
}

Structure.propTypes = {
  children: PropTypes.node.isRequired
};

TickerArea.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

const StyledHero = styled(Hero)`
  grid-column: 1 / span 2;
  grid-row: 25 / span 2;
`;

const StyledNotifier = styled(Notifier)`
  grid-row: 23 / span 2;
  align-self: end;
`;

const StyledQueue = styled(Queue)`
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
`;

export default Scene;
