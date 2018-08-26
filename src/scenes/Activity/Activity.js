import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import { Hero } from 'components';

import styled from 'styled-components';
import Frame from 'styles/Frame';

const Layout = () => (
  <Fragment>
    <StyledHero />
    <div>one</div>
  </Fragment>
);

class Activity extends Component {
  render() {
    return (
      <Fragment>
        <Frame.Border />
        <Frame.Wrapper>
          <Layout />
        </Frame.Wrapper>
      </Fragment>
    );
  }
}

const StyledHero = styled(Hero)`
  grid-row: 1 / span 2;
`;

export default Activity;
