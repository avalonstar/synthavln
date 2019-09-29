import { useState, useEffect } from 'react';
import createUseContext from 'constate';

const { tmi } = window;
const { NODE_ENV } = process.env;

function useTmi() {
  const [client, setClient] = useState(
    new tmi.client({
      // eslint-disable-line new-cap
      options: { debug: NODE_ENV !== 'production' },
      connection: { reconnect: true, secure: true },
      channels: ['#avalonstar']
    })
  );

  useEffect(() => {
    return () => {
      client.disconnect();
    };
  }, [client]);

  return [client, setClient];
}

const useTmiContext = createUseContext(useTmi, value => [value.client]);

export default useTmiContext;
