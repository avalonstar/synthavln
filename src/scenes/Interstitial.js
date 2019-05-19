import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Logo } from 'components';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Frame } from 'styles';

const propTypes = {
  message: PropTypes.string
};

const defaultProps = {
  message: ''
};

const structureProps = {
  children: PropTypes.node.isRequired
};

const Message = ({ message }) => (
  <Wrapper>
    <Supertitle>Interstitial</Supertitle>
    <Title>{message}</Title>
    <Subtitle>avalonstar.tv</Subtitle>
  </Wrapper>
);

const Structure = ({ children }) => (
  <Fragment>
    <Frame.OuterBorder />
    {children}
    <Frame.InnerBorder />
  </Fragment>
);

const Scene = ({ message }) => (
  <Structure>
    <Frame.Wrapper>
      <Logo isVisible />
      <Message message={message} />
    </Frame.Wrapper>
  </Structure>
);

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;
Scene.propTypes = propTypes;
Scene.defaultProps = defaultProps;
Structure.propTypes = structureProps;

const Wrapper = styled.div`
  grid-column: 1 / span 2;
  grid-row: 19 / span 8;
  margin: 24px;
  padding: 36px;
`;

const Supertitle = styled.div`
  margin-left: 4px;
  margin-bottom: 8px;
  padding-bottom: 8px;

  box-shadow: 0 1px 0 ${props => rgba(props.theme.colors.white, 0.5)};
  color: ${props => rgba(props.theme.colors.white, 0.5)};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
`;

const Title = styled.div`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 96px;
  font-weight: 800;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

const Subtitle = styled.div`
  margin-top: 8px;
  margin-left: 4px;

  color: ${props => rgba(props.theme.colors.white, 0.5)};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 24px;
  font-weight: 200;
`;

export default Scene;
