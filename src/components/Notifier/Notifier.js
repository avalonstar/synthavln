import React, { Component } from 'react';

import Item from './Item';

import styled from 'styled-components';

import notifierPool from 'helpers/notifications';

class Notifier extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool[0] !== this.props.notifierPool[0];
  }

  render() {
    const data = notifierPool[0];
    return (
      <Wrapper className={this.props.className}>
        <Item key={data.timestamp} data={data} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  z-index: 1000;
  align-items: end;
`;

export default Notifier;
