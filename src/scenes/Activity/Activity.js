import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import { Camera, Logomark, Hero, Notifier, Queue } from 'components';

import styled from 'styled-components';
import { Frame } from 'styles';

const Layout = () => (
  <Parallax pages={3} scrolling={false} ref={ref => (this.parallax = ref)}>
    <ParallaxLayer offset={0} speed={0.5}>
      <Frame.Wrapper onClick={() => this.parallax.scrollTo(1)}>
        {/* <StyledCamera /> */}
        <StyledHero />
      </Frame.Wrapper>
    </ParallaxLayer>

    <ParallaxLayer offset={1} speed={0.5}>
      <Frame.Wrapper>
        <StyledNotifier />
      </Frame.Wrapper>
    </ParallaxLayer>

    <ParallaxLayer offset={1} speed={1}>
      <Frame.Wrapper onClick={() => this.parallax.scrollTo(0)}>
        <StyledQueue />
      </Frame.Wrapper>
    </ParallaxLayer>
  </Parallax>
);

class Activity extends Component {
  render() {
    return (
      <Fragment>
        <StyledLogomark />
        <Frame.OuterBorder />
        <Frame.Wrapper>
          <Layout />
        </Frame.Wrapper>
        <Frame.InnerBorder />
      </Fragment>
    );
  }
}

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
