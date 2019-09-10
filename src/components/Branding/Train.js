import { addSeconds, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTrainContext } from 'providers';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

function Train({ className }) {
  const { isTrainActive, count, timer } = useTrainContext();
  const [isVisible, setIsVisible] = useState(false);
  const [clock, setClock] = useState();

  useEffect(() => {
    setIsVisible(isTrainActive);
  }, [isTrainActive]);

  useEffect(() => {
    const helper = addSeconds(new Date(0), timer);
    setClock(format(helper, 'mm:ss'));
  }, [timer]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Wrapper
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Widget>
            <Count>{count}</Count>
            <Timer>{clock}</Timer>
          </Widget>
        </Wrapper>
      )}{' '}
    </AnimatePresence>
  );
}

Train.propTypes = {
  className: PropTypes.string
};

Train.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  position: relative;
`;

const Widget = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  align-items: center;

  font-family: ${props => props.theme.fonts.freight};
  font-weight: 600;
  font-variant-numeric: lining-nums;
  font-feature-settings: 'lnum';
`;

const Count = styled.div`
  padding: 4px 10px;
  margin: 0 10px 0 6px;

  background-color: ${props => props.theme.colors.main.avayellow};
  border-radius: 4px;
  color: ${props => props.theme.colors.black};
`;

const Timer = styled.div`
  color: ${props => props.theme.colors.white};
`;

export default Train;
