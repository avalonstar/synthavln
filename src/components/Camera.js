import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Chrome } from 'styles';

const Camera = ({ className, title }) => (
  <Chrome className={className} title={title}>
    <Zone />
  </Chrome>
);

Camera.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

Camera.defaultProps = {
  className: '',
  title: ''
};

const Zone = styled.div`
  padding-top: ${(9 / 16) * 100}%;
  background: ${props => props.theme.colors.gray[0]};
`;

export default Camera;
