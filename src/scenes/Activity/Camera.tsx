import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Camera } from 'components';

const Scene = ({ width, ratio }) => (
  <StyledCamera ratio={ratio} width={width} />
);

Scene.propTypes = {
  width: PropTypes.number,
  ratio: PropTypes.number
};

Scene.defaultProps = {
  width: 480,
  ratio: 9 / 16
};

const StyledCamera = styled(Camera)`
  margin: 24px;
  width: ${props => props.width}px;
  z-index: 1000;
`;

export default Scene;
