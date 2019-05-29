import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, config, useSpring } from 'react-spring';

import styled from 'styled-components';

import { Train as TrainIcon } from 'components/Icons/Queue';

function Train({ className, notifications }) {
  const lastSeenNotification = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const visibility = useSpring({
    config: config.stiff,
    transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-200%, 0, 0)'
  });
  const [count, setCount] = useState(0);
  const [timeleft, setTimeleft] = useState();

  useEffect(() => {
    const last = notifications[notifications.length - 1];
    if (
      last &&
      last.bucket === 'subscription' &&
      (!lastSeenNotification.current ||
        last.id !== lastSeenNotification.current)
    ) {
      lastSeenNotification.current = last.id;
      setTimeleft(300);
      setCount(c => c + 1);
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
      setIsVisible(false);
    } else if (timeleft >= 0 && !isVisible) {
      setIsVisible(true);
    }
  }, [timeleft, isVisible]);

  return (
    <Wrapper className={className} style={visibility}>
      <Widget>
        <TrainIcon />
        <Count>{count}</Count>
        <Timer>{timeleft}</Timer>
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

const Wrapper = styled(animated.div)`
  position: relative;
  display: inline-flex;
  height: 42px;
`;

const Widget = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  margin-left: 36px;
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
