import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import styled from 'styled-components';

import { SubPointTotal } from 'components/Icons/Ticker';

import firestore from 'firestore';

function Total() {
  const [score, setScore] = useState(0);
  const [goal, setGoal] = useState(0);
  const [value, loading] = useDocument(
    firestore.firestore().doc('broadcasters/avalonstar')
  );
  useEffect(() => {
    if (!loading && value) {
      const { subscriptions } = value.data();
      setScore(subscriptions.score);
      setGoal(subscriptions.next_level.minimum_score);
    }
  }, [loading, value]);

  return (
    <Wrapper>
      <Icon>
        <SubPointTotal />
      </Icon>
      <Title>SubPoints</Title>
      <Stat>
        <Number>{numeral(score).format('0,0')}</Number>/
        {numeral(goal).format('0,0')}
      </Stat>
    </Wrapper>
  );
}

export default Total;

const Wrapper = styled.div`
  display: none;
  position: relative;
  padding: 15px 12px 16px 62px;

  background: ${props => props.theme.colors.muted.dark};
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
