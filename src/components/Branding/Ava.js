import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Frame } from 'styles';

import destiny from './assets/ava-destiny.png';
import starShirt from './assets/ava-star-shirt.png';

const propTypes = {
  version: PropTypes.string
};

const defaultProps = {
  version: 'variety'
};

const imagePropTypes = {
  className: PropTypes.string
};

const imageDefaultProps = {
  className: ''
};

const Destiny = ({ className }) => (
  <img className={className} src={destiny} alt="destiny" />
);

const StarShirt = ({ className }) => (
  <img className={className} src={starShirt} alt="starShirt" />
);

const getAva = version =>
  ({
    destiny: <StyledDestiny />,
    variety: <StyledStarShirt />
  }[version]);

const Ava = ({ version }) => <Frame.Base>{getAva(version)}</Frame.Base>;

Ava.propTypes = propTypes;
Ava.defaultProps = defaultProps;
Destiny.propTypes = imagePropTypes;
Destiny.defaultProps = imageDefaultProps;
StarShirt.propTypes = imagePropTypes;
StarShirt.defaultProps = imageDefaultProps;

const StyledDestiny = styled(Destiny)`
  position: absolute;
  bottom: 0;
  right: -65px;
  z-index: 1500;
  width: 340px;
`;

const StyledStarShirt = styled(StarShirt)`
  position: absolute;
  bottom: 0;
  right: -80px;
  z-index: 1500;
  width: 340px;
`;

export default Ava;
