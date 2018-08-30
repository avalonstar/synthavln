import { combineReducers } from 'redux';

const notifications = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default notifications;

export const getNotifications = state => state.notifications;
