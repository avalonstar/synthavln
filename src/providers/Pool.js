import { useReducer } from 'react';
import createUseContext from 'constate';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [action.event, ...state];
    case 'delete':
      return [...state.slice(1)];
    case 'empty':
      return [];
    default:
      throw new Error('Unexpected action.');
  }
};

const usePoolContext = createUseContext(() => useReducer(reducer, []));

export default usePoolContext;
