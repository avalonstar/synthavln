import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import styled from 'styled-components';
import { rgba } from 'polished';
import { ChevronRight } from 'react-feather';

import Item from './Item';

const propTypes = {
  className: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  className: ''
};

class Queue extends PureComponent {
  state = {
    isVisible: false
  };

  componentWillReceiveProps(nextProps) {
    const { length } = nextProps.notifications;
    if (length > 2) {
      this.timer = setTimeout(() => this.setState({ isVisible: true }));
    } else if (length < 2) {
      this.timer = setTimeout(() => this.setState({ isVisible: false }));
    }
  }

  render() {
    const { className, notifications } = this.props;
    const { isVisible } = this.state;
    return (
      <Wrapper pose={isVisible ? 'open' : 'closed'} className={className}>
        <Count>
          next <ChevronRight size={14} />
        </Count>
        <Items>
          <PoseGroup preEnterPose="from">
            {notifications.slice(1).map((event, i) => (
              <AnimatedItem i={i} key={event.timestamp} data={event} />
            ))}
          </PoseGroup>
        </Items>
      </Wrapper>
    );
  }
}

Queue.propTypes = propTypes;
Queue.defaultProps = defaultProps;

const queuePoses = {
  open: { y: '0%' },
  closed: { y: '100%' }
};

const AnimatedItem = posed(Item)({
  from: { opacity: 0, width: 'auto', y: '100%' },
  enter: { opacity: 1, width: 'auto', x: '0%', y: '0%' },
  exit: { opacity: 0, width: 0, x: '-125%' }
});

const Wrapper = styled(posed.div(queuePoses))`
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
  font-family: ${props => props.theme.fonts.inter};
  font-size: 16px;
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
