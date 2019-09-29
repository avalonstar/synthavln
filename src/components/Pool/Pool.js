import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { usePoolContext } from 'providers';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import Item from './Item';

function Pool({ className }) {
  const [pool] = usePoolContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(Boolean(pool.length));
  }, [pool]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isVisible && (
        <motion.div
          className={className}
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          exit={{ opacity: 0 }}
        >
          <Items>
            {pool.map(event => (
              <Item key={event.timestamp} data={event} />
            ))}
          </Items>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Pool.propTypes = {
  className: PropTypes.string
};

Pool.defaultProps = {
  className: ''
};

const Items = styled.ol`
  display: flex;
  margin: 0;
  padding: 0;

  list-style: none;
`;

export default Pool;
