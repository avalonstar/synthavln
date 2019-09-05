import { addSeconds, format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { Train as TrainIcon } from 'components/Icons/Queue';

const variants = {
  show: { x: 0 },
  hide: { x: '-100%' }
};

function Train({ className, notifications }) {
  const lastSeenNotification = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [timeleft, setTimeleft] = useState(0);
  const [timer, setTimer] = useState();

  useEffect(() => {
    const last = notifications[notifications.length - 1];
    if (
      last &&
      (last.bucket === 'subscription' || last.event === 'mysterygift') &&
      (!lastSeenNotification.current ||
        last.id !== lastSeenNotification.current)
    ) {
      const amount = parseInt(last.amount, 10) || 1;
      lastSeenNotification.current = last.id;
      setTimeleft(300);
      setCount(c => c + amount);
    }
  }, [notifications]);

  useEffect(() => {
    const id = setInterval(() => {
      if (timeleft > 0) {
        setTimeleft(t => t - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [timeleft]);

  useEffect(() => {
    if (timeleft <= 0) {
      setCount(0);
      setIsVisible(false);
    } else if (timeleft >= 0 && !isVisible) {
      setIsVisible(true);
    }
  }, [timeleft, isVisible]);

  useEffect(() => {
    const helper = addSeconds(new Date(0), timeleft);
    setTimer(format(helper, 'mm:ss'));
  }, [timeleft]);

  return (
    <Wrapper
      className={className}
      animate={isVisible ? 'show' : 'hide'}
      variants={variants}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], type: 'tween' }}
    >
      <Widget>
        <TrainIcon />
        <Count>{count}</Count>
        <Timer>{timer}</Timer>
      </Widget>
    </Wrapper>
  );
}

Train.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

Train.defaultProps = {
  className: ''
};

const Wrapper = styled(motion.div)`
  position: relative;
  display: inline-flex;
  height: 42px;
`;

const Widget = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  margin-left: 24px;
  padding: 0 12px;

  background-color: ${props => props.theme.colors.muted.dark};
  border-radius: 3px;
  box-shadow: ${props => props.theme.shadows[2]};
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 14px;
`;

const Count = styled.div`
  padding-left: 12px;
  padding-right: 6px;
  color: ${props => props.theme.colors.main.avayellow};
`;

const Timer = styled.div`
  color: ${props => props.theme.colors.white};
`;

export default Train;
