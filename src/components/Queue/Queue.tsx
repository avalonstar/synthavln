import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Bits, Follow, Gift, Raid, Sub, Tip } from 'components/Icons/Queue';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ChevronsUp } from 'react-feather';

function Queue({ className, notifications }) {
  const [isVisible, setIsVisible] = useState(false);

  const getType = () => ({
    cheer: <Bits />,
    follow: <Follow />,
    mysterygift: <Gift />,
    subscription: <Sub />,
    subgift: <Gift />,
    raid: <Raid />,
    resub: <Sub />,
    tip: <Tip />
  });

  useEffect(() => {
    let timer;
    const { length } = notifications;
    if (length > 2) {
      timer = setTimeout(() => setIsVisible(true));
    } else if (length < 2) {
      timer = setTimeout(() => setIsVisible(false));
    }
    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Wrapper
          className={className}
          initial={{ opacity: 0, scale: 1.1, x: '15%' }}
          animate={{ opacity: 1, scale: 1.0, x: '0%' }}
          exit={{ opacity: 0, x: '-15%' }}
        >
          <Count>
            <ChevronsUp color="#b4cbd6" size={24} />
            next:
          </Count>
          <Items>
            {notifications.slice(1).map(({ timestamp, event }) => (
              <motion.li
                positionTransition
                key={timestamp}
                initial={{ opacity: 0, scale: 1.1, x: '15%' }}
                animate={{ opacity: 1, scale: 1.0, x: '0%' }}
                exit={{ opacity: 0, x: '-15%' }}
              >
                <Icon>{getType()[event]}</Icon>
              </motion.li>
            ))}
          </Items>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

Queue.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

Queue.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  position: relative;
  display: inline-grid;
  grid-template-columns: auto auto;
  height: 42px;

  background-color: ${props => props.theme.colors.muted.dark};
  border-radius: 3px;
  box-shadow: ${props => props.theme.shadows[2]};
  font-size: 14px;
`;

const Items = styled.ol`
  grid-column: 2;
  position: relative;
  align-items: center;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0 12px;

  list-style: none;
`;

const Count = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
  padding: 5px 0 7px 24px;

  color: ${props => props.theme.colors.muted.lightbluegrey};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 700;
  text-transform: uppercase;

  svg {
    position: relative;
    top: 1px;
    padding-right: 14px;
  }
`;

const Icon = styled.div`
  padding: 0px 6px;
`;

export default Queue;
