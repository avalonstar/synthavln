import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Frame } from 'styles';

import starShirt from './assets/ava-star-shirt.png';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const StarShirt = ({ className }) => (
  <img className={className} src={starShirt} alt="starShirt" />
);

const Ava = () => (
  <Frame.Base>
    <StyledStarShirt />
  </Frame.Base>
);

StarShirt.propTypes = propTypes;
StarShirt.defaultProps = defaultProps;

const StyledStarShirt = styled(StarShirt)`
  position: absolute;
  bottom: 0;
  right: -90px;
  z-index: 1500;
  width: 340px;
`;

export default Ava;
