import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import Daily from './Daily';
import Total from './Total';

function Summaries({ className, isVisible }) {
  return (
    isVisible && (
      <Wrapper
        className={className}
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: '0%' }}
      >
        <Total />
        <Daily />
      </Wrapper>
    )
  );
}

Summaries.propTypes = {
  className: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

Summaries.defaultProps = {
  isVisible: false
};

const Wrapper = styled(motion.div)`
  display: flex;
`;

export default Summaries;
