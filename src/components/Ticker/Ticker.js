import React from 'react';
import PropTypes from 'prop-types';
import { config, useTransition } from 'react-spring';

import styled from 'styled-components';
import { rgba } from 'polished';

import Item from './Item';

function Ticker({ events, isVisible }) {
  const transitions = useTransition(events, event => event.id, {
    trail: 1000 / events.length,
    from: { opacity: 0, transform: 'translate3d(0, 100%, 0)' },
    enter: [{ opacity: 1, transform: 'translate3d(0, 0, 0)' }],
    leave: [{ opacity: 0, transform: 'translate3d(0, 100%, 0)' }]
  });

  return (
    events && (
      <Wrapper>
        {transitions.map(({ item, props: { ...rest }, key }) => (
          <Item style={rest} key={key} data={item} />
        ))}
      </Wrapper>
    )
  );
}

Ticker.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  isVisible: PropTypes.bool
};

Ticker.defaultProps = {
  events: [],
  isVisible: false
};

const Wrapper = styled.ol`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;

  :after {
    position: absolute;
    right: 0;
    height: 100%;
    width: 72px;

    content: '';
    background-image: linear-gradient(
      to right,
      ${props => rgba(props.theme.colors.gray[2], 0)},
      ${props => props.theme.colors.gray[2]}
    );
  }
`;

export default Ticker;
