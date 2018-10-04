import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Daily from './Daily';
import Total from './Total';

const propTypes = {
  isVisible: PropTypes.bool
};

const defaultProps = {
  isVisible: false
};

const Summaries = ({ isVisible }) => (
  <Wrapper>
    <Daily />
    <Total />
  </Wrapper>
);

Summaries.propTypes = propTypes;
Summaries.defaultProps = defaultProps;

const Wrapper = styled.div`
  display: flex;
`;

export default Summaries;
