import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Chrome } from 'styles';

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string
};

const defaultProps = {
  title: ''
};

const Camera = props => (
  <Chrome className={props.className} title={props.title}>
    <Zone />
  </Chrome>
);

const Zone = styled.div`
  padding-top: ${(9 / 16) * 100}%;
  background: ${props => props.theme.colors.gray[0]};
`;

export default Camera;
