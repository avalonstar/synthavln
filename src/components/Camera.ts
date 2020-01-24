import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Chrome } from 'styles';

const Camera = ({ className, title, ratio }) => (
  <Chrome className={className} title={title}>
    <Zone ratio={ratio} />
  </Chrome>
);

Camera.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  ratio: PropTypes.number.isRequired
};

Camera.defaultProps = {
  className: '',
  title: ''
};

const Zone = styled.div`
  padding-top: ${props => props.ratio * 100}%;
  background: ${props => props.theme.colors.gray[0]};
`;

export default Camera;
