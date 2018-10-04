/* eslint-disable no-return-assign */
/* eslint-disable react/no-this-in-sfc */

import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parallax, ParallaxLayer } from 'react-spring';

import {
  Ava,
  Logotype,
  Hero,
  Notifier,
  Progress,
  Queue,
  Summary,
  Ticker
} from 'components';
import UIContext from 'contexts';
import * as Providers from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

const tickerProps = {
  state: PropTypes.shape({}).isRequired,
  isVisible: PropTypes.bool.isRequired
};

const notificationProps = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired
};

const structureProps = {
  children: PropTypes.node.isRequired
};

const TickerArea = ({ state, isVisible }) => (
  <ParallaxLayer offset={0} speed={-0.3}>
    <Frame.Wrapper>
      <StyledHero>
        <Logotype isVisible={isVisible} />
        <Ticker events={state.data} isVisible={isVisible} />
        <Summary isVisible={isVisible} />
      </StyledHero>
    </Frame.Wrapper>
  </ParallaxLayer>
);

const NotificationsArea = ({ notifications, onComplete }) => (
  <ParallaxLayer offset={1} speed={-0.3}>
    <Frame.Wrapper>
      <StyledNotifier notifications={notifications} onComplete={onComplete} />
      <StyledQueue notifications={notifications} />
    </Frame.Wrapper>
  </ParallaxLayer>
);

class Layout extends PureComponent {
  state = {
    page: 0
  };

  componentWillReceiveProps(nextProps) {
    const { length } = nextProps.notifications;
    setTimeout(() => (length > 0 ? this.scroll(1) : this.scroll(0)), 250);
  }

  scroll = to => {
    const { parallax } = this.props;
    parallax.scrollTo(to);
    this.setState({ page: to });
  };

  render() {
    const { page } = this.state;
    return (
      <Fragment>
        <TickerArea {...this.props} isVisible={page === 0} />
        <NotificationsArea {...this.props} isVisible={page === 1} />
      </Fragment>
    );
  }
}

const Structure = ({ children }) => (
  <Fragment>
    <UIContext.Consumer>
      {({ game }) => <Ava version={game} />}
    </UIContext.Consumer>
    <Frame.OuterBorder />
    <Parallax pages={2} scrolling={false} ref={ref => (this.parallax = ref)}>
      {children}
    </Parallax>
    <Frame.InnerBorder />
  </Fragment>
);

const Scene = () => (
  <Fragment>
    <Providers.Events>
      {props => (
        <Structure>
          <Layout {...props} parallax={this.parallax} />
        </Structure>
      )}
    </Providers.Events>
    <Providers.Broadcaster>
      {({ subscriptions }) => (
        <StyledProgress
          score={subscriptions.score}
          goal={subscriptions.next_level}
        />
      )}
    </Providers.Broadcaster>
  </Fragment>
);

TickerArea.propTypes = tickerProps;
NotificationsArea.propTypes = notificationProps;
Structure.propTypes = structureProps;

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

const StyledProgress = styled(Progress)`
  display: none;
  top: 1078px;
`;

export default Scene;
