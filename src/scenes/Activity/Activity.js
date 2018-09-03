import React, { Fragment, PureComponent } from 'react';
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

class Layout extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { length } = nextProps.notifications;
    setTimeout(() => (length > 0 ? this.scroll(1) : this.scroll(0)), 250);
  }

  scroll = to => this.props.parallax.scrollTo(to);

  render() {
    return (
      <Fragment>
        <TickerArea {...this.props} />
        <NotificationsArea {...this.props} />
      </Fragment>
    );
  }
}

const TickerArea = props => (
  <ParallaxLayer offset={0} speed={-0.3}>
    <Frame.Wrapper onClick={() => props.parallax.scrollTo(1)}>
      <StyledHero>
        <Logotype />
        <Ticker events={props.state.data} />
        <Summary />
      </StyledHero>
    </Frame.Wrapper>
  </ParallaxLayer>
);

const NotificationsArea = props => (
  <ParallaxLayer offset={1} speed={-0.3}>
    <Frame.Wrapper onClick={() => props.parallax.scrollTo(0)}>
      <StyledNotifier
        notifications={props.notifications}
        onComplete={props.onComplete}
      />
      <StyledQueue notifications={props.notifications} />
    </Frame.Wrapper>
  </ParallaxLayer>
);

const Structure = props => (
  <Fragment>
    <Frame.OuterBorder />
    <Parallax pages={2} scrolling={false} ref={ref => (this.parallax = ref)}>
      {props.children}
    </Parallax>
    <Frame.InnerBorder />
  </Fragment>
);

const Scene = props => (
  <Providers.Events>
    {props => (
      <Structure>
        <Layout {...props} parallax={this.parallax} />
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
