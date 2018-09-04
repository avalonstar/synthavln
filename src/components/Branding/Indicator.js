import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const Indicator = ({ className }) => <Square className={className} />;

Indicator.propTypes = propTypes;
Indicator.defaultProps = defaultProps;

const Square = styled.div`
  width: 24px;
  height: 28px;

  background-image: linear-gradient(-135deg, #f5faa4 0%, #afd76b 100%);
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export default Indicator;
