import { useReducer } from 'react';
import createUseContext from 'constate';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.event];
    case 'delete':
      return [...state.slice(1)];
    default:
      throw new Error('Unexpected action.');
  }
};

const useNotificationContext = createUseContext(() => useReducer(reducer, []));

export default useNotificationContext;
