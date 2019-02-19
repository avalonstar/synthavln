import { useReducer } from 'react';
import createContainer from 'constate';

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

const NotificationContainer = createContainer(() => useReducer(reducer, []));

export default NotificationContainer;
