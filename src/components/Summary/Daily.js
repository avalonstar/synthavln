import { startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import styled from 'styled-components';

import firestore from 'firestore';

function Daily() {
  const [size, set] = useState(0);

  const startTime = startOfToday();
  const { loading, value } = useCollection(
    firestore
      .firestore()
      .collection('events')
      .where('bucket', '==', 'subscription')
      .where('timestamp', '>=', startTime)
  );
  useEffect(() => {
    if (!loading && value) {
      set(value.size);
    }
  }, [loading, value]);

  return (
    <Wrapper>
      <Title>Total</Title>
      <Stat>
        <Number>{size}</Number>
        {' Buttons Pressed'}
      </Stat>
    </Wrapper>
  );
}

export default Daily;

const Wrapper = styled.div`
  padding: 14px 24px 16px;

  background: ${props => props.theme.colors.muted.dark};
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  transition: all 250ms ${props => props.theme.easing};
  white-space: nowrap;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Stat = styled.div`
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

const Number = styled.span`
  color: ${props => props.theme.colors.muted.yellow};
`;
