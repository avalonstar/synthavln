import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import Item from './Item';

const Ticker = props => (
  <Wrapper>
    {props.events.map(event => (
      <Item key={event.id} data={event} />
    ))}
  </Wrapper>
);

const Wrapper = styled.ol`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 12px 0;

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
