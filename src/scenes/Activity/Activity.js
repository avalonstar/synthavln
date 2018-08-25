import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import Frame from 'styles/Frame';

const Layout = () => (
  <Fragment>
    <ParallaxLayer offset={0}>
      <div>one</div>
    </ParallaxLayer>
    <ParallaxLayer offset={1}>
      <div>two</div>
    </ParallaxLayer>
  </Fragment>
);

class Activity extends Component {
  render() {
    return (
      <Fragment>
        <Frame.Border />
        <Frame.Wrapper>
          <Parallax className="hi" ref="parallax" pages={2} scrolling={false}>
            <Layout />
          </Parallax>
        </Frame.Wrapper>
      </Fragment>
    );
  }
}

export default Activity;
