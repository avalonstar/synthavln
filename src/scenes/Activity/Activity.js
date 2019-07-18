import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';

import { Logo, Notifier, Queue, Summaries, Ticker, Train } from 'components';
import { Events, Notifications } from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

function TickerArea({ isVisible }) {
  const { events } = useContext(Events.Context);
  return (
    <Fragment>
      <StyledLogo isVisible={isVisible} />
      <StyledSummaries isVisible={isVisible} />
      <StyledTicker events={events} isVisible={isVisible} />
    </Fragment>
  );
}

function NotificationsArea() {
  const [notifications] = useContext(Notifications.Context);
  return (
    <Fragment>
      <StyledNotifier notifications={notifications} />
      <StyledQueue notifications={notifications} />
      <StyledTrain notifications={notifications} />
    </Fragment>
  );
}

function Layout() {
  return (
    <StyledWrapper>
      <TickerArea isVisible />
      <NotificationsArea />
    </StyledWrapper>
  );
}

function Structure({ children }) {
  return <Fragment>{children}</Fragment>;
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

const StyledWrapper = styled(Frame.Wrapper)`
  grid-template-columns: auto auto auto;

  box-shadow: inset 0 60px 0 ${props => props.theme.colors.main.dark};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 500;
`;

const StyledLogo = styled(Logo)`
  grid-column: 1;
  grid-row: 1 / span 2;
  padding-bottom: 12px;
  padding-left: 24px;
`;

const StyledSummaries = styled(Summaries)`
  grid-column: 2;
  grid-row: 1 / span 2;
  padding-bottom: 12px;
`;

const StyledTicker = styled(Ticker)`
  grid-column: 3;
  grid-row: 1 / span 2;
  padding-bottom: 12px;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 3;
  grid-row: 1 / span 2;
  align-self: start;
  justify-self: center;
`;

const StyledQueue = styled(Queue)`
  grid-column: 3;
  grid-row: 23 / span 2;
  align-self: end;
  justify-self: start;
`;

const StyledTrain = styled(Train)`
  grid-column: 1 / span 3;
  grid-row: 3 / span 2;
  align-self: start;
`;

export default Scene;
