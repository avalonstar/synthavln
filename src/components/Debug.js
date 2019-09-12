import crypto from 'crypto';
import React, { useEffect, useState } from 'react';

import { useNotificationContext, usePoolContext } from 'providers';

import styled from 'styled-components';

function Debug({ className }) {
  const [, dispatchToNotifications] = useNotificationContext();
  const [, dispatchToPool] = usePoolContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  const testEvent = {
    id:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    bucket: 'subscription',
    event: 'resub',
    displayName: 'Avalonstar',
    subPlan: '1000',
    cumulativeMonths: Math.floor(Math.random() * Math.floor(54)),
    timestamp: Date.now()
  };

  return (
    isVisible && (
      <Wrapper className={className}>
        <Button
          type="button"
          onClick={() => {
            dispatchToNotifications({ type: 'add', event: testEvent });
            dispatchToPool({ type: 'add', event: testEvent });
          }}
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
