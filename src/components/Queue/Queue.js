import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';
import { ChevronDown } from 'react-feather';

import Item from './Item';

function Queue({ className, notifications }) {
  const [isVisible, setIsVisible] = useState(false);

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
    <Wrapper className={className} isVisible={isVisible}>
      <Count>
        <ChevronDown color="#b4cbd6" size={24} />
        next:
      </Count>
      <Items>
        {notifications.slice(1).map((event, i) => (
          <Item i={i} key={event.timestamp} data={event} />
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

// const queuePoses = {
//   open: { y: '0%' },
//   closed: { y: '100%' }
// };

// const AnimatedItem = posed(Item)({
//   from: { opacity: 0, width: 'auto', y: '100%' },
//   enter: { opacity: 1, width: 'auto', x: '0%', y: '0%' },
//   exit: { opacity: 0, width: 0, x: '-125%' }
// });

const Wrapper = styled.div`
  position: relative;
  display: inline-grid;
  grid-template-columns: auto auto;

  background-color: ${props => props.theme.colors.muted.dark};
  border-radius: 3px;
  font-size: 14px;
`;

const Items = styled.ol`
  grid-column: 2;
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0 24px;

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
