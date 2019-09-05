import React, { useContext, useEffect, useState } from 'react';

import { Notifications } from 'providers';

import styled from 'styled-components';

function Debug({ className }) {
  const [notifications, dispatch] = useContext(Notifications.Context); // eslint-disable-line
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  const testEvent = {
    bucket: 'subscription',
    event: 'resub',
    displayName: 'Avalonstar',
    subPlan: '1000',
    cumulativeMonths: '54',
    timestamp: Date.now()
  };

  return (
    isVisible && (
      <Wrapper className={className}>
        <Button
          type="button"
          onClick={() => dispatch({ type: 'add', event: testEvent })}
        >
          Test Notification
        </Button>
      </Wrapper>
    )
  );
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.muted.dark};
  padding: 12px 24px;
  width: 100%;
`;

const Button = styled.button`
  padding: 4px 12px;

  background-color: ${props => props.theme.colors.main.dark};
  color: ${props => props.theme.colors.white};
  border-radius: 4px;
  border-width: 0;
  font-size: 14px;
  font-weight: 600;
`;

export default Debug;
