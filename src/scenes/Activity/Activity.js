import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import { Brand } from 'components/Branding';

import styled from 'styled-components';
import Frame from 'styles/Frame';

const Layout = () => (
  <Fragment>
    <StyledBrand />
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

const StyledBrand = styled(Brand)`
  grid-row: 1 / span 2;
`;

export default Activity;
