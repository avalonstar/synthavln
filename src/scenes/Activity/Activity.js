import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Debug, Hero, Notifier, Queue, Summaries, Ticker } from 'components';
import { Events, Notifications } from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

function NotificationsArea({ isVisible }) {
  const { events } = useContext(Events.Context);
  const [notifications] = useContext(Notifications.Context);
  return (
    <>
      <StyledHero notifications={notifications} />
      <StyledSummaries isVisible={isVisible} />
      <StyledTicker events={events} isVisible={isVisible} />
      <StyledNotifier notifications={notifications} />
      <StyledQueue notifications={notifications} />
    </>
  );
}

function Layout() {
  return (
    <StyledWrapper>
      <NotificationsArea isVisible />
      <StyledDebug />
    </StyledWrapper>
  );
}

function Structure({ children }) {
  return <>{children}</>;
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

NotificationsArea.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

const StyledWrapper = styled(Frame.Wrapper)`
  grid-template-columns: auto auto 1fr;

  box-shadow: ${props =>
    `inset 0 160px 100px -100px ${props.theme.colors.muted.dark}`};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 500;
`;

const StyledSummaries = styled(Summaries)`
  display: none;
  grid-column: 2;
  grid-row: 1 / span 2;
`;

const StyledTicker = styled(Ticker)`
  display: none;
  grid-column: 3;
  grid-row: 1 / span 2;
  align-self: center;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  align-self: start;
  justify-self: center;
  margin-top: 32px;
`;

const StyledQueue = styled(Queue)`
  grid-column: 3;
  grid-row: 3 / span 2;
  align-self: start;
  justify-self: start;
`;

const StyledHero = styled(Hero)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  align-self: start;
`;

const StyledDebug = styled(Debug)`
  position: fixed;
  bottom: 0;
`;

export default Scene;
