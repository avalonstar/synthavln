import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, config, useSpring, useTransition } from 'react-spring';

import styled from 'styled-components';

import { Train as TrainIcon } from 'components/Icons/Queue';

function Train({ className, notifications }) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState();

  useEffect(() => {}, [notifications]);

  useEffect(() => {}, [notifications]);

  return (
    <Wrapper className={className}>
      <Widget>
        <TrainIcon />
        <Count>{count}</Count>
        <Timer>0:00</Timer>
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
