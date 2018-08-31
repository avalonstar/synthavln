import React, { Component } from 'react';

import Item from './Item';

import styled from 'styled-components';
import { ChevronRight } from 'react-feather';

import notifications from 'helpers/notifications';

class Queue extends Component {
  render() {
    return (
      <Wrapper className={this.props.className}>
        <Count>
          next <ChevronRight size={14} />
          {/* <Length>{notifications.length}</Length> */}
        </Count>
        <Items>
          {this.props.notifications.slice(1).map(event => (
            <Item key={event.timestamp} data={event} />
          ))}
        </Items>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  align-self: end;
  padding: 0 36px 24px;
  width: calc(${props => props.theme.frame.width} - 36px * 2);

  background-color: ${props => props.theme.colors.gray[2]};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 14px;
  font-weight: 500;
`;

const Items = styled.ol`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0;

  list-style: none;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 6px 0 0;
  font-family: ${props => props.theme.fonts.din};
  font-weight: 700;
  text-transform: uppercase;
`;

const Length = styled.span`
  padding: 2px 4px;
  background-color: ${props => props.theme.colors.gray[0]};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 12px;
`;

export default Queue;
