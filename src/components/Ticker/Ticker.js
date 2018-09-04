import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import styled from 'styled-components';
import { rgba } from 'polished';

import Item from './Item';

const propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isVisible: PropTypes.bool
};

const defaultProps = {
  isVisible: false
};

class Ticker extends PureComponent {
  state = {
    events: []
  };

  componentDidMount() {
    const { events } = this.props;
    this.setState({ events });
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => this.setState({ events: nextProps.events }), 1000);
  }

  render() {
    const { isVisible } = this.props;
    const { events } = this.state;
    return (
      <Wrapper initialPose="exit" pose={isVisible ? 'enter' : 'exit'}>
        <PoseGroup>
          {events.map((event, i) => (
            <AnimatedItem i={i} key={event.id} data={event} />
          ))}
        </PoseGroup>
      </Wrapper>
    );
  }
}

Ticker.propTypes = propTypes;
Ticker.defaultProps = defaultProps;

const animationDelay = 300;

const tickerPoses = {
  exit: { y: '-100%' },
  enter: {
    y: '0',
    transition: { delay: animationDelay, type: 'spring', damping: 12 }
  }
};

const AnimatedItem = posed(Item)({
  enter: {
    opacity: 1,
    delay: ({ i }) => animationDelay + i * 20,
    transition: { type: 'spring', damping: 12 }
  },
  exit: { opacity: 0 }
});

const Wrapper = styled(posed.ol(tickerPoses))`
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
