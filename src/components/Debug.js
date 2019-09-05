import React, { useContext, useState } from 'react';

import { Notifications } from 'providers';

import styled from 'styled-components';

function Debug() {
  const [notifications, dispatch] = useContext(Notifications.Context); // eslint-disable-line
  const [isVisible, setIsVisible] = useState(false);

  const testEvent = {
    bucket: 'subscription',
    event: 'resub',
    displayName: 'Avalonstar',
    subPlan: '1000',
    cumulativeMonths: Math.floor(Math.random() * Math.floor(54)),
    timestamp: Date.now()
  };

  return (
    <Button
      type="button"
      onClick={() => dispatch({ type: 'add', event: testEvent })}
    >
      Test Notification
    </Button>
  );
}

const Button = styled.button`
  background-color: ${props => props.theme.colors.muted.dark};
  color: ${props => props.theme.colors.white};
  border-radius: 4px;
  border-width: 0;
  font-size: 14px;
  font-weight: 600;
`;

export default Debug;
