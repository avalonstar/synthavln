import { takeRight } from 'lodash';
import { useReducer } from 'react';
import createUseContext from 'constate';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [takeRight(...state, 50), action.event];
    case 'delete':
      return [...state.slice(1)];
    default:
      throw new Error('Unexpected action.');
  }
};

const useMessageContext = createUseContext(() => useReducer(reducer, []));

export default useMessageContext;
