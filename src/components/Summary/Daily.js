import { startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import styled from 'styled-components';

import { ButtonsPressed } from 'components/Icons/Ticker';

import firestore from 'firestore';

function Daily() {
  const [size, set] = useState(0);
  const [value, loading] = useCollection(
    firestore
      .firestore()
      .collection('broadcasters')
      .doc('avalonstar')
      .collection('events')
      .where('bucket', '==', 'subscription')
      .where('timestamp', '>=', startOfToday())
  );
  useEffect(() => {
    if (!loading && value) {
      set(value.size);
    }
  }, [loading, value]);

  return (
    <Wrapper>
      <Icon>
        <ButtonsPressed />
      </Icon>
      <Stat>
        <Number>{size}</Number>
        {' Buttons Pressed'}
      </Stat>
    </Wrapper>
  );
}

export default Daily;

const Wrapper = styled.div`
  position: relative;
  padding: 15px 24px 16px 62px;
  align-self: center;

  /* background: ${props => props.theme.colors.muted.dark}; */
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  transition: all 250ms ${props => props.theme.easing};
  white-space: nowrap;
`;

const Icon = styled.div`
  position: absolute;
  left: 24px;
  top: calc(50% - 12px);
`;

const Stat = styled.div`
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

const Number = styled.span`
  color: ${props => props.theme.colors.muted.yellow};
  font-weight: 800;
`;
