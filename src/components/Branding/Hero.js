import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Logo from './Logo';
import Logotype from './Logotype';
import Timer from './Timer';
import Train from './Train';

function Hero({ className, notifications }) {
  const lastSeenNotification = useRef();
  const [state, setState] = useState('idle');
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
      setTimeLeft(300);
      setCount(c => c + amount);
    }
  }, [notifications]);

  useEffect(() => {
    const id = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(t => t - 1);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCount(0);
      setState('idle');
      setIsVisible(false);
    } else if (timeLeft >= 0 && !isVisible) {
      setIsVisible(true);
      setState('train');
    }
  }, [timeLeft, isVisible]);

  return (
    <Wrapper className={className}>
      <StyledTimer timeLeft={timeLeft} />
      <StyledLogo state={state} />
      <StyledTrain count={count} timeLeft={timeLeft} state={state} />
      <StyledLogotype state={state} />
    </Wrapper>
  );
}

Hero.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

Hero.defaultProps = {
  className: ''
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 24px auto;
  align-items: center;
`;

const StyledTimer = styled(Timer)`
  grid-column: 1 / span 2;
  grid-row: 1;
  align-self: start;
`;

const StyledLogo = styled(Logo)`
  grid-row: 2;
  padding-left: 24px;
`;

const StyledTrain = styled(Train)`
  grid-column: 2;
  grid-row: 2;
`;

const StyledLogotype = styled(Logotype)`
  grid-column: 2;
  grid-row: 2;
`;

export default Hero;
