import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import { Trail } from 'react-spring';

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
        <Trail
          items={events}
          keys={item => item.id}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
        >
          {(item, i) => props => (
            <Item style={props} i={i} key={item.id} data={item} />
          )}
        </Trail>
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

const Wrapper = styled(posed.ol(tickerPoses))`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  padding: 10px 0;

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
