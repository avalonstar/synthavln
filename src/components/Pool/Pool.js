import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePoolContext } from 'providers';

import styled from 'styled-components';

function Pool() {
  const [pool] = usePoolContext();
  return (
    <AnimatePresence>
      <Wrapper>{JSON.stringify(pool)}</Wrapper>
    </AnimatePresence>
  );
}

const Wrapper = styled.div``;

export default Pool;
