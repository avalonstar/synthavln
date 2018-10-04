import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Logotype, Hero, Notifier, Queue, Summaries, Ticker } from 'components';
import * as Providers from 'providers';

import styled from 'styled-components';
import { Frame } from 'styles';

const layoutPropTypes = {
  state: PropTypes.shape({}).isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired
};

const structureProps = {
  children: PropTypes.node.isRequired
};

const Layout = ({ state, notifications, onComplete }) => (
  <Fragment>
    <StyledHero>
      <Logotype isVisible />
      <Ticker events={state.data} isVisible />
      <Summaries isVisible />
    </StyledHero>
    <StyledNotifier notifications={notifications} onComplete={onComplete} />
    <StyledQueue notifications={notifications} />
  </Fragment>
);

const Structure = ({ children }) => (
  <Fragment>
    <Frame.OuterBorder />
    <Frame.Wrapper>{children}</Frame.Wrapper>
    <Frame.InnerBorder />
  </Fragment>
);

const Scene = () => (
  <Providers.Events>
    {props => (
      <Structure>
        <Layout {...props} />
      </Structure>
    )}
  </Providers.Events>
);

Layout.propTypes = layoutPropTypes;
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

export default Scene;
