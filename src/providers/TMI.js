import createUseContext from 'constate';

const { tmi } = window;
const { NODE_ENV } = process.env;

function useTmi() {
  // eslint-disable-next-line new-cap
  const client = new tmi.client({
    options: {
      debug: NODE_ENV !== 'production'
    },
    connection: {
      reconnect: true,
      secure: true
    },
    channels: ['#avalonstar']
  });

  return { client };
}

const useTmiContext = createUseContext(useTmi, value => [value.client]);

export default useTmiContext;
