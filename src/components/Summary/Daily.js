import { startOfToday } from 'date-fns';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withFirestore } from 'react-firestore';

import styled from 'styled-components';
import { ChevronRight } from 'react-feather';

const propTypes = {
  firestore: PropTypes.shape({}).isRequired
};

class Daily extends PureComponent {
  state = {
    size: 0
  };

  componentDidMount() {
    const { firestore } = this.props;
    const startTime = startOfToday();
    const collection = firestore
      .collection('events')
      .where('bucket', '==', 'subscription')
      .where('timestamp', '>=', startTime);
    collection.onSnapshot(snapshot => {
      this.setState({ size: snapshot.size });
    });
  }

  render() {
    const { size } = this.state;
    return (
      <Wrapper>
        <Title>
          <ChevronRight color="#eaf56b" size={18} />
          {'Buttons Pressed'}
        </Title>
        <Stat>{size}</Stat>
      </Wrapper>
    );
  }
}

export default withFirestore(Daily);

Daily.propTypes = propTypes;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;

  box-shadow: inset 0 0 0 1px ${props => props.theme.colors.gray[6]};
  border-radius: 4px;
  color: ${props => props.theme.colors.white};
  font-size: 14px;
  text-transform: uppercase;
  transition: all 250ms ${props => props.theme.easing};
  white-space: nowrap;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;

  color: ${props => props.theme.colors.gray[18]};
  font-family: ${props => props.theme.fonts.inter};
  font-weight: 600;
`;

const Stat = styled.div`
  margin-left: 0;
  padding: 8px 12px;

  box-shadow: inset 1px 0 0 0 ${props => props.theme.colors.gray[6]};
  font-weight: 800;
`;
