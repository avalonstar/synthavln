import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';

import Item from './Item';

import styled from 'styled-components';
import { rgba } from 'polished';
import { ChevronRight } from 'react-feather';

class Queue extends Component {
  state = {
    isVisible: true
  };

  render() {
    return (
      <Wrapper
        pose={this.state.isVisible ? 'open' : 'closed'}
        className={this.props.className}
      >
        <Count>
          next <ChevronRight size={14} />
        </Count>
        <Items>
          <PoseGroup preEnterPose="from">
            {this.props.notifications.slice(1).map((event, i) => (
              <AnimatedItem i={i} key={event.timestamp} data={event} />
            ))}
          </PoseGroup>
        </Items>
      </Wrapper>
    );
  }
}

const queueProps = {
  open: { y: '0%' },
  closed: { y: '100%' }
};

const AnimatedItem = posed(Item)({
  from: { width: 'auto', y: '100%' },
  enter: { width: 'auto', x: '0%', y: '0%' },
  exit: { width: 0, x: '-125%' }
});

const Wrapper = styled(posed.div(queueProps))`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-self: end;
  height: 40px;
  padding: 0 36px 12px;
  width: calc(${props => props.theme.frame.width} - 36px * 2);

  background-color: ${props => props.theme.colors.gray[2]};
  box-shadow: ${props => props.theme.shadows[2]};
  color: ${props => props.theme.colors.gray[20]};
  font-family: ${props => props.theme.fonts.gotham};
  font-size: 14px;
  font-weight: 500;
`;

const Items = styled.ol`
  grid-column: 2;
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 0;

  list-style: none;

  :before {
    position: absolute;
    left: 0;
    height: 100%;
    width: 12px;
    z-index: 1;

    content: '';
    background-image: linear-gradient(
      to left,
      ${props => rgba(props.theme.colors.gray[2], 0)},
      ${props => props.theme.colors.gray[2]}
    );
  }
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

const Count = styled.div`
  grid-column: 1;
  display: flex;
  align-items: center;
  padding: 12px 6px 12px 0;

  font-family: ${props => props.theme.fonts.din};
  font-weight: 700;
  text-transform: uppercase;
`;

export default Queue;
