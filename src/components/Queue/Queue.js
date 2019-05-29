import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { animated, config, useSpring, useTransition } from 'react-spring';

import styled from 'styled-components';
import { ChevronDown } from 'react-feather';

import Item from './Item';

function Queue({ className, notifications }) {
  const [isVisible, setIsVisible] = useState(false);
  const visibility = useSpring({
    config: config.stiff,
    transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-500%, 0, 0)'
  });

  const transitions = useTransition(
    notifications.slice(1),
    notification => notification.id,
    {
      trail: 1000 / notifications.length,
      from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
      enter: [{ opacity: 1, transform: 'translate3d(0, 0, 0)' }],
      leave: [{ opacity: 0, transform: 'translate3d(0, 100%, 0)' }]
    }
  );

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
    <Wrapper className={className} style={visibility}>
      <Count>
        <ChevronDown color="#b4cbd6" size={24} />
        next:
      </Count>
      <Items>
        {transitions.map(({ item, props: { ...rest }, key }) => (
          <Item style={rest} key={key} data={item} />
        ))}
      </Items>
    </Wrapper>
  );
}

Queue.propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

Queue.defaultProps = {
  className: ''
};

const Wrapper = styled(animated.div)`
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

export default Queue;
