import React, { useEffect, useState } from 'react';

import { useNotificationContext, usePoolContext } from 'providers';

import styled from 'styled-components';

function Debug({ className }) {
  const [, dispatchToNotifications] = useNotificationContext();
  const [, dispatchToPool] = usePoolContext();
  const [isVisible, setIsVisible] = useState(false);

  const events = [
    {
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      bucket: 'subscription',
      event: 'subgift',
      gifter: 'herdyderp',
      name: 'HypnotikXIV',
      plan: '3000',
      months: Math.floor(Math.random() * Math.floor(60)),
      timestamp: Date.now()
    },
    {
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      bucket: 'subscription',
      event: 'subscription',
      name: 'erikantha',
      plan: '1000',
      timestamp: Date.now()
    },
    {
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      bucket: 'subscription',
      event: 'resub',
      name: 'Avalonstar',
      plan: '2000',
      months: Math.floor(Math.random() * Math.floor(60)),
      timestamp: Date.now()
    },
    {
      id:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15),
      bucket: 'subscription',
      event: 'mysterygift',
      name: 'Tekitoumei',
      count: 5,
      plan: '1000',
      timestamp: Date.now()
    }
  ];
  const event = events[Math.floor(Math.random() * events.length)];

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }
  }, []);

  return (
    isVisible && (
      <Wrapper className={className}>
        <Button
          type="button"
          onClick={() => {
            dispatchToNotifications({ type: 'add', event });
            dispatchToPool({ type: 'add', event });
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
